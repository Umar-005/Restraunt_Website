#!/usr/bin/env bash
set -o errexit

python -m pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate --noinput

if [ -n "${ADMIN_RESET_PASSWORD:-}" ]; then
    python manage.py reset_admin_password
fi
