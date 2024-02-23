from datetime import datetime
import requests


def menuGetter(mode, location, period, date=datetime.now().strftime('%m/%d/%Y')):
    # Define the API endpoint and query parameters
    url = 'https://uci.campusdish.com/api/menu/GetMenus'
    params = {
        'locationId': '3314',
        'storeIds': '',
        'mode': mode,
        'date': date,
        'time': '',
        'periodId': '49',
        'fulfillmentMethod': ''
    }

    # Make the GET request
    response = requests.get(url, params=params)
    menu_items = []
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        # Extract
        menu = data.get('Menu', {}).get('MenuProducts', [])

        # Process
        for product in menu:
            product_info = product.get('Product', {})
            item = {
                'Name': product_info.get('MarketingName'),
                'Description': product_info.get('ShortDescription'),
                'Allergens': ', '.join(
                    [allergen for allergen, present in product_info.get('AvailableFilters', {}).items() if
                     present]),
                'Calories': product_info.get('Calories'),
                'Serving Size': f"{product_info.get('ServingSize')} {product_info.get('ServingUnit')}"
            }
            menu_items.append(item)
    else:
        print(f"Failed to fetch data: {response.status_code}")
    return menu_items


# location: 3056 = Anteatery, #3314 = Brandywine
# mode: daily or weekly
# period: 49 is breakfast, #106 is lunch, #107 is dinner, #108 is late night


# Example usage
menu_items = menuGetter("daily", "3314", "108")
if menu_items:
    with open("menu_items.txt", "w") as file:
        for item in menu_items:
            file.write(f"{item['Name']} + {item['Calories']}\n")
