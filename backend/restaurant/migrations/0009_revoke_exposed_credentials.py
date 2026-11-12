from django.contrib.auth.hashers import make_password
from django.db import migrations


def revoke_credentials(apps, schema_editor):
    alias = schema_editor.connection.alias
    apps.get_model("authtoken", "Token").objects.using(alias).all().delete()
    apps.get_model("sessions", "Session").objects.using(alias).all().delete()
    users = apps.get_model("auth", "User").objects.using(alias)
    for user in users.filter(username__in=["umar", "test"]):
        user.password = make_password(None)
        if user.username == "test":
            user.is_active = False
        user.save(using=alias, update_fields=["password", "is_active"])


class Migration(migrations.Migration):
    dependencies = [
        ("restaurant", "0008_order_email"),
        ("authtoken", "0004_alter_tokenproxy_options"),
        ("sessions", "0001_initial"),
    ]
    operations = [migrations.RunPython(revoke_credentials, migrations.RunPython.noop)]
