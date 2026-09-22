from django.db import models


class MenuItem(models.Model):

    CATEGORY_CHOICES = [
        ("Starters", "Starters"),
        ("Mains", "Mains"),
        ("Sides", "Sides"),
        ("Desserts", "Desserts"),
        ("Drinks", "Drinks"),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )
    available = models.BooleanField(
        default=True
    )
    image = models.ImageField(
        upload_to="menu/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class RestaurantTable(models.Model):

    table_number = models.PositiveIntegerField(
        unique=True
    )

    seats = models.PositiveIntegerField()

    def __str__(self):
        return f"Table {self.table_number} ({self.seats} seats)"


class Reservation(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Cancelled", "Cancelled"),
    ]

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )

    date = models.DateField()

    time = models.TimeField()

    party_size = models.PositiveIntegerField()

    table = models.ForeignKey(
        RestaurantTable,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"


class Order(models.Model):

    DELIVERY_CHOICES = [
        ("Delivery", "Delivery"),
        ("Pickup", "Pickup"),
    ]

    PAYMENT_CHOICES = [
        ("Card", "Card"),
        ("Cash", "Cash"),
    ]

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )

    address = models.TextField(
        blank=True
    )

    delivery_method = models.CharField(
        max_length=20,
        choices=DELIVERY_CHOICES
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    total = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Order #{self.id} - {self.name}"


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.PROTECT
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity}"