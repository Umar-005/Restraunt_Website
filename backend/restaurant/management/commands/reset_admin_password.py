import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Reset the administrator password using an environment variable"

    def handle(self, *args, **options):
        password = os.environ.get("ADMIN_RESET_PASSWORD")

        if not password:
            raise CommandError("ADMIN_RESET_PASSWORD is not configured")

        User = get_user_model()

        try:
            user = User.objects.get(username="umar")
        except User.DoesNotExist:
            raise CommandError("Administrator account 'umar' not found")

        user.set_password(password)
        user.save(update_fields=["password"])

        self.stdout.write(
            self.style.SUCCESS("Administrator password reset successfully")
        )

