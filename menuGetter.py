from datetime import datetime
import requests


def menuGetter(mode, location, period, date=datetime.now().strftime('%m/%d/%Y')):
    # Define the API endpoint and query parameters
    url = 'https://uci.campusdish.com/api/menu/GetMenus'
    params = {
        'locationId': location,
        'storeIds': '',
        'mode': mode,
        'date': date,
        'time': '',
        'periodId': period,
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
        period_mapping = {'49': 'b', '106': 'l', '107': 'd', '108': 'm'}
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
                'Serving Size': f"{product_info.get('ServingSize')} {product_info.get('ServingUnit')}",
                'Period': period_mapping.get(period, 'Unknown')
            }
            menu_items.append(item)
    else:
        print(f"Failed to fetch data: {response.status_code}")
    return menu_items


# location: 3056 = Anteatery, #3314 = Brandywine
# mode: daily or weekly
# period: 49 is breakfast, #106 is lunch, #107 is dinner, #108 is late night


# Example usage

menu_items = menuGetter("weekly", "3314", "108")
menu_items.extend(menuGetter("weekly", "3314","49"))
menu_items.extend(menuGetter("weekly", "3314","106"))
menu_items.extend(menuGetter("weekly", "3314","107"))
menu_items.extend(menuGetter("weekly", "3056","107"))
menu_items.extend(menuGetter("weekly", "3056","49"))
menu_items.extend(menuGetter("weekly", "3056","106"))
menu_items.extend(menuGetter("weekly", "3056","108"))

output = set()

if menu_items:
    for item in menu_items:
        temp = (item['Name'], item['Calories'],item['Period'])
        if temp not in output:
            output.add(temp)

if output:
    with open("menu_items.txt", "w") as file:
        for item in sorted(output, key=lambda x:x[2]):
            file.write(f"{item[0]} , {item[1]} ,  {item[2]} \n")
