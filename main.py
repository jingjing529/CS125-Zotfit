import requests

# Define the API endpoint and query parameters
url = 'https://uci.campusdish.com/api/menu/GetMenus'
params = {
    'locationId': '3314', #3056 = Anteatery, #3314 = Brandywine
    'storeIds': '',
    'mode': 'daily', #daily or weekly
    'date': '02/07/2024', #today's date
    'time': '',
    'periodId': '49', #49 is breakfast, #106 is lunch, #107 is dinner, #108 is late night
    'fulfillmentMethod': ''
}

# Make the GET request
response = requests.get(url, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # Extract
    menu = data.get('Menu', {}).get('MenuProducts', [])

    # Process
    for product in menu:
        product_info = product.get('Product', {})
        print(f"Name: {product_info.get('MarketingName')}")
        print(f"Description: {product_info.get('ShortDescription')}")
        allergens = ', '.join([allergen for allergen, present in product_info.get('AvailableFilters', {}).items() if present])
        print(f"Allergens: {allergens}")
        print(f"Calories: {product_info.get('Calories')}")
        print(f"Serving Size: {product_info.get('ServingSize')} {product_info.get('ServingUnit')}")
        print("\n-------------------\n")
else:
    print(f"Failed to fetch data: {response.status_code}")
