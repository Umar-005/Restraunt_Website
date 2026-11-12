from datetime import date, timedelta
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from .models import MenuItem, RestaurantTable


class SecurityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user('staff', password='a-test-password', is_staff=True)
        self.menu = MenuItem.objects.create(name='Soup', price='5.00', category='Starters')
        RestaurantTable.objects.create(table_number=1, seats=4)

    def test_login_rotates_token(self):
        old = Token.objects.create(user=self.staff).key
        response = self.client.post('/api/login/', {'username': 'staff', 'password': 'a-test-password'})
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['token'], old)
        self.assertFalse(Token.objects.filter(key=old).exists())

    def test_order_status_and_staff_update(self):
        response = self.client.post('/api/orders/', {
            'name': 'Guest', 'email': 'guest@example.com', 'phone': '123',
            'delivery_method': 'Pickup', 'payment_method': 'Cash', 'status': 'Completed',
            'items': [{'menu_item': self.menu.pk, 'quantity': 2}],
        }, format='json')
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data['status'], 'Pending')
        url = f"/api/orders/{response.data['id']}/"
        self.assertIn(self.client.patch(url, {'status': 'Completed'}).status_code, [401, 403])
        self.client.force_authenticate(self.staff)
        response = self.client.patch(url, {'status': 'Completed'})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data['status'], 'Completed')

    def test_reservation_status_and_staff_update(self):
        response = self.client.post('/api/reservations/', {
            'name': 'Guest', 'email': 'guest@example.com', 'phone': '123',
            'date': str(date.today() + timedelta(days=1)), 'time': '18:00',
            'party_size': 2, 'status': 'Confirmed',
        })
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data['status'], 'Pending')
        url = f"/api/reservations/{response.data['id']}/"
        self.assertIn(self.client.patch(url, {'status': 'Confirmed'}).status_code, [401, 403])
        self.client.force_authenticate(self.staff)
        response = self.client.patch(url, {'status': 'Confirmed'})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data['status'], 'Confirmed')
