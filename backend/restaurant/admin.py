from django.contrib import admin

from .models import (
    MenuItem,
    Reservation,
    RestaurantTable,
    Order,
    OrderItem
)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "available"
    )

    list_filter = (
        "category",
        "available"
    )

    search_fields = (
        "name",
        "description"
    )


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "date",
        "time",
        "party_size",
        "table",
        "status"
    )

    list_filter = (
        "date",
        "status"
    )

    search_fields = (
        "name",
        "email",
        "phone"
    )


@admin.register(RestaurantTable)
class RestaurantTableAdmin(admin.ModelAdmin):
    list_display = (
        "table_number",
        "seats"
    )

    ordering = (
        "table_number",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "delivery_method",
        "payment_method",
        "status",
        "total",
        "created_at"
    )

    list_filter = (
        "status",
        "delivery_method",
        "payment_method"
    )

    search_fields = (
        "name",
        "phone"
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "menu_item",
        "quantity",
        "price"
    )