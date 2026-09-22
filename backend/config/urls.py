from django.contrib import admin

from django.urls import path, include

from rest_framework.routers import DefaultRouter

from restaurant.views import (
    MenuItemViewSet,
    ReservationViewSet,
    OrderViewSet,
    login,
    RestaurantTableViewSet,
    StaffViewSet
)

from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()

router.register(r'menu', MenuItemViewSet)

router.register("reservations", ReservationViewSet)

router.register("orders", OrderViewSet)

router.register("tables", RestaurantTableViewSet)

router.register("staff", StaffViewSet)

urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "api/",
        include(router.urls)
    ),

    path(
        "api/login/",
        login
    ),

]


urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)