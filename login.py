import os
import requests

PHONE_NUMBER_ID = "641511689034742"
ACCESS_TOKEN = "EAAJMCNhC1dQBQB6hWfus38pGu8okZBeGkeOgSG3K0pKjHKjRgDzZC1Wow1lSd1PDkADZAEVd2IfM0k5AJS6qEZA7TzbqiTIZBawHEdYu9htnxPvSLxc86vPdHG0WgCB3L4Vpz2LT6jZBvxNtYyAJklVxhKvEVgu8lMWn9fg1UvbnTsGP4Klu8B6pG8VWrsEooX3KPyEoTJf7QkZBgZBCwjCYyWhLyHoHa4NR1ToQLJrvGQXN71unC9eZCMfDvQtB0AxcRlQxNZAZArZBA0WZA6NBX3Pu4HCbBZCDQ4j8fY4BT6YgZDZD"
TO = "25779614036"  # full international format, no '+' or spaces

url = f"https://graph.facebook.com/v22.0/{PHONE_NUMBER_ID}/phone_numbers"
headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json"
}
payload = {
    "messaging_product": "whatsapp",
    "to": TO,
    "type": "text",
    "text": {
        "body": "Hello! This is a test message."
    }
}

resp = requests.post(url, headers=headers, json=payload)
print(resp.status_code)
print(resp.text)