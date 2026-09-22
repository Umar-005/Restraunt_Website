from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, action

from datetime import datetime, timedelta

from django.db import transaction

from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .permissions import IsStaff, IsAdmin

from django.core.mail import send_mail

from .models import (
    MenuItem,
    Reservation,
    RestaurantTable,
    Order,
    OrderItem,
)

from .serializers import (
    MenuItemSerializer,
    ReservationSerializer,
    OrderSerializer,
    RestaurantTableSerializer,
    StaffSerializer
)


class MenuItemViewSet(viewsets.ModelViewSet):

    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaff()]


class ReservationViewSet(viewsets.ModelViewSet):

    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_permissions(self):

        if self.action == "create":
            return [AllowAny()]

        return [IsStaff()]

    def create(self, request, *args, **kwargs):

        date = request.data.get("date")
        time = request.data.get("time")
        party_size = request.data.get("party_size")

        # Validate required values before converting them
        if not date or not time or not party_size:

            return Response(
                {
                    "error": "Date, time and party size are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            party_size = int(party_size)

            booking_date = datetime.strptime(
                date,
                "%Y-%m-%d"
            ).date()

            booking_time = datetime.strptime(
                time,
                "%H:%M"
            ).time()

        except (ValueError, TypeError):

            return Response(
                {
                    "error": "Invalid date, time or party size."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        booking_start = datetime.combine(
            booking_date,
            booking_time
        )

        booking_end = booking_start + timedelta(minutes=90)

        reservations = Reservation.objects.filter(
            date=booking_date,
            status__in=["Pending", "Confirmed"]
        )

        reserved_tables = []

        for reservation in reservations:

            existing_start = datetime.combine(
                reservation.date,
                reservation.time
            )

            existing_end = existing_start + timedelta(minutes=90)

            if (
                booking_start < existing_end
                and booking_end > existing_start
            ):

                if reservation.table_id:
                    reserved_tables.append(
                        reservation.table_id
                    )

        available_table = (
            RestaurantTable.objects
            .filter(seats__gte=party_size)
            .exclude(id__in=reserved_tables)
            .order_by("seats")
            .first()
        )

        if not available_table:

            return Response(
                {
                    "error": "No tables are available for this time."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(
            data=request.data
        )

        if serializer.is_valid():

            reservation = serializer.save(
                table=available_table
            )

            try:
                send_mail(
                    subject="Ember & Oak - Reservation Confirmed",
                    message=f"""
Hi {reservation.name},

Your reservation at Ember & Oak has been confirmed.

Reservation details:

Date: {reservation.date.strftime("%d %B %Y")}
Time: {reservation.time.strftime("%H:%M")}
Guests: {reservation.party_size}
Table: {reservation.table.table_number}

We look forward to seeing you.

Ember & Oak
""",
                    from_email="noreply@emberandoak.com",
                    recipient_list=[reservation.email],
                    fail_silently=False,
                )
            except Exception as error:
                print("EMAIL ERROR:", error)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]

        return [IsStaff()]

    def partial_update(self, request, *args, **kwargs):

        print("PATCH DATA:", request.data)

        response = super().partial_update(
            request,
            *args,
            **kwargs
        )

        print("PATCH RESPONSE:", response.data)

        return response

    def create(self, request, *args, **kwargs):

        items = request.data.get("items", [])

        if not items:
            return Response(
                {
                    "error": "Order must contain at least one item."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        total = 0
        order_items = []

        for item in items:

            menu_item_id = item.get("menu_item")
            quantity = item.get("quantity", 0)

            try:
                quantity = int(quantity)

            except (ValueError, TypeError):

                return Response(
                    {
                        "error": "Invalid quantity."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity < 1:

                return Response(
                    {
                        "error": "Quantity must be at least 1."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:

                menu_item = MenuItem.objects.get(
                    id=menu_item_id,
                    available=True
                )

            except MenuItem.DoesNotExist:

                return Response(
                    {
                        "error": (
                            f"Menu item {menu_item_id} "
                            "is unavailable."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            item_total = menu_item.price * quantity

            total += item_total

            order_items.append(
                {
                    "menu_item": menu_item,
                    "quantity": quantity,
                    "price": menu_item.price
                }
            )

        serializer = self.get_serializer(
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        order_data = serializer.validated_data.copy()

        order_data.pop("items")

        # Create the Order and all OrderItems
        # inside one database transaction.

        with transaction.atomic():

            order = Order.objects.create(
                **order_data,
                total=total
            )

            for item in order_items:

                OrderItem.objects.create(
                    order=order,
                    menu_item=item["menu_item"],
                    quantity=item["quantity"],
                    price=item["price"]
                )

        # Send confirmation email AFTER the order
        # has been successfully saved.

        try:

            email_items = []

            for item in order_items:

                menu_item = item["menu_item"]

                item_total = (
                    item["price"] *
                    item["quantity"]
                )

                email_items.append(
                    f"{menu_item.name} "
                    f"x {item['quantity']} "
                    f"- £{item_total:.2f}"
                )

            items_text = "\n".join(
                email_items
            )

            send_mail(
                subject="Ember & Oak - Order Confirmation",

                message=f"""
Hi {order.name},

Thank you for your order from Ember & Oak.

Your order has been received successfully.

Order number: #{order.id}

Order details:

{items_text}

--------------------------------
Delivery method: {order.delivery_method}
Payment method: {order.payment_method}
Total: £{order.total:.2f}
--------------------------------

Your order is now being prepared.

Thank you for choosing Ember & Oak.

Ember & Oak
""",

                from_email="noreply@emberandoak.com",

                recipient_list=[
                    order.email
                ],

                fail_silently=False,
            )

        except Exception as error:

            print(
                "ORDER EMAIL ERROR:",
                error
            )

        return Response(
            self.get_serializer(order).data,
            status=status.HTTP_201_CREATED
        )


class StaffViewSet(viewsets.ModelViewSet):

    # Include BOTH normal staff and the admin.
    # The previous version excluded the superuser,
    # which is why your admin was not appearing.
    queryset = User.objects.filter(
        is_staff=True
    ).order_by("username")

    serializer_class = StaffSerializer

    def get_permissions(self):

        # Any logged-in staff member can view the
        # staff list.

        if self.action in ["list", "retrieve"]:
            return [IsStaff()]

        # Creating, editing, deleting and transferring
        # admin privileges require an administrator.

        return [IsAdmin()]

    def create(self, request, *args, **kwargs):

        if not request.user.is_superuser:

            return Response(
                {
                    "error": "Only administrators can add staff."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            self.get_serializer(user).data,
            status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):

        if not request.user.is_superuser:

            return Response(
                {
                    "error": "Only administrators can edit staff."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        user = self.get_object()

        # Do not allow the admin to change their own
        # superuser status through a normal edit.
        if user == request.user:

            if "is_superuser" in request.data:

                return Response(
                    {
                        "error": (
                            "Use the admin transfer option "
                            "to change administrator privileges."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return super().update(
            request,
            *args,
            **kwargs
        )

    def partial_update(self, request, *args, **kwargs):

        if not request.user.is_superuser:

            return Response(
                {
                    "error": "Only administrators can edit staff."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        user = self.get_object()

        # Admin privileges cannot be changed through
        # the normal edit endpoint.
        if "is_superuser" in request.data:

            return Response(
                {
                    "error": (
                        "Use the admin transfer option "
                        "to change administrator privileges."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # is_staff should also never be changed manually.
        if "is_staff" in request.data:

            return Response(
                {
                    "error": (
                        "Staff permissions cannot be "
                        "changed through this endpoint."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().partial_update(
            request,
            *args,
            **kwargs
        )

    def destroy(self, request, *args, **kwargs):

        if not request.user.is_superuser:

            return Response(
                {
                    "error": "Only administrators can remove staff."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        user = self.get_object()

        # Never allow the current admin to delete themselves.
        if user == request.user:

            return Response(
                {
                    "error": (
                        "You cannot delete your own account."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Another superuser/admin cannot be deleted.
        # They must first have their admin privileges
        # transferred away.
        if user.is_superuser:

            return Response(
                {
                    "error": (
                        "An administrator cannot be deleted. "
                        "Transfer admin privileges first."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="transfer-admin"
    )
    @transaction.atomic
    def transfer_admin(self, request, pk=None):

        # Only the current administrator can transfer
        # administrator privileges.
        if not request.user.is_superuser:

            return Response(
                {
                    "error": (
                        "Only administrators can transfer "
                        "administrator privileges."
                    )
                },
                status=status.HTTP_403_FORBIDDEN
            )

        current_admin = request.user

        new_admin = self.get_object()

        # Cannot transfer to yourself.
        if new_admin == current_admin:

            return Response(
                {
                    "error": (
                        "You are already the administrator."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # The target must be a staff member.
        if not new_admin.is_staff:

            return Response(
                {
                    "error": (
                        "Admin privileges can only be "
                        "transferred to a staff member."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Make the new user an administrator.
        new_admin.is_superuser = True
        new_admin.is_staff = True

        new_admin.save(
            update_fields=[
                "is_superuser",
                "is_staff"
            ]
        )

        # Remove administrator privileges from the
        # previous administrator.
        current_admin.is_superuser = False
        current_admin.is_staff = True

        current_admin.save(
            update_fields=[
                "is_superuser",
                "is_staff"
            ]
        )

        return Response(
            {
                "message": (
                    f"Admin privileges transferred to "
                    f"{new_admin.username}."
                )
            },
            status=status.HTTP_200_OK
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:

        return Response(
            {
                "error": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:

        return Response(
            {
                "error": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_staff:

        return Response(
            {
                "error": "Staff access required."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    token, created = Token.objects.get_or_create(
        user=user
    )

    return Response(
        {
            "token": token.key,
            "username": user.username,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser
        },
        status=status.HTTP_200_OK
    )


class RestaurantTableViewSet(viewsets.ModelViewSet):

    queryset = RestaurantTable.objects.all()
    serializer_class = RestaurantTableSerializer

    def get_permissions(self):

        return [IsStaff()]