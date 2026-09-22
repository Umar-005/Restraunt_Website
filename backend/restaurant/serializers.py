from datetime import date, time, timedelta
from django.contrib.auth.models import User
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import (
    MenuItem,
    Reservation,
    Order,
    OrderItem,
    RestaurantTable
)


class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuItem
        fields = "__all__"


class ReservationSerializer(serializers.ModelSerializer):

    table_number = serializers.IntegerField(
        source="table.table_number",
        read_only=True
    )

    class Meta:
        model = Reservation

        fields = [
            "id",
            "name",
            "email",
            "phone",
            "date",
            "time",
            "party_size",
            "table",
            "table_number",
            "status",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "table",
            "table_number",
            "created_at"
        ]

    def validate(self, data):

        # Allow staff to update only the status without re validating the original reservation details.
        if (
            self.instance is not None
            and set(data.keys()) == {"status"}
        ):
            return data

        reservation_date = data.get(
            "date",
            getattr(self.instance, "date", None)
        )

        reservation_time = data.get(
            "time",
            getattr(self.instance, "time", None)
        )

        party_size = data.get(
            "party_size",
            getattr(self.instance, "party_size", None)
        )

        today = date.today()
        maximum_date = today + timedelta(days=30)

        # Date validation

        if reservation_date is not None:

            if reservation_date <= today:

                raise serializers.ValidationError({
                    "date": "Reservations must be for a future date."
                })

            if reservation_date > maximum_date:

                raise serializers.ValidationError({
                    "date": (
                        "Reservations can only be made "
                        "up to 30 days in advance."
                    )
                })

        # Party size validation

        if party_size is not None:

            if party_size < 1:

                raise serializers.ValidationError({
                    "party_size": "Party size must be at least 1."
                })

            if party_size > 6:

                raise serializers.ValidationError({
                    "party_size": "The maximum party size is 6."
                })

        # Time interval validation

        if reservation_time is not None:

            if reservation_time.minute not in [0, 30]:

                raise serializers.ValidationError({
                    "time": (
                        "Reservations must be made "
                        "in 30-minute intervals."
                    )
                })

            # Opening hours validation

            if (
                reservation_time < time(17, 0)
                or reservation_time > time(21, 30)
            ):

                raise serializers.ValidationError({
                    "time": (
                        "Reservations are available "
                        "between 17:00 and 21:30."
                    )
                })

        return data


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem

        fields = [
            "menu_item",
            "quantity",
            "price"
        ]

        read_only_fields = [
            "price"
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "delivery_method",
            "payment_method",
            "status",
            "total",
            "items",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "total",
            "items",
            "created_at"
        ]

    def validate(self, data):

        delivery_method = data.get(
            "delivery_method",
            getattr(
                self.instance,
                "delivery_method",
                None
            )
        )

        address = data.get(
            "address",
            getattr(
                self.instance,
                "address",
                ""
            )
        )

        address = address.strip()

        if (
            delivery_method == "Delivery"
            and not address
        ):

            raise serializers.ValidationError({
                "address": (
                    "An address is required for delivery."
                )
            })

        return data


class RestaurantTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = RestaurantTable
        fields = "__all__"
    

class StaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False
    )

    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_active",
            "role",
            "date_joined",
            "last_login",
        ]

        read_only_fields = [
            "id",
            "role",
            "date_joined",
            "last_login",
        ]

    def get_role(self, obj):
        if obj.is_superuser:
            return "Admin"

        return "Staff"

    def create(self, validated_data):
        password = validated_data.pop("password", None)

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        user.is_staff = True
        user.is_active = True
        user.save()

        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)

        if password:
            instance.set_password(password)

        instance.save()

        return instance