async function menuGetter(mode, location, period, date = new Date().toISOString().slice(0, 10).replace(/-/g, '/')) {
  const url = 'https://uci.campusdish.com/api/menu/GetMenus';
  const params = new URLSearchParams({
    locationId: location,
    storeIds: '',
    mode: mode,
    date: date,
    time: '',
    periodId: period,
    fulfillmentMethod: '',
  });

  try {
    const response = await fetch(`${url}?${params}`);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status_code}`);
    const data = await response.json();

    const menu = data.Menu?.MenuProducts || [];
    const menuItems = menu.map(product => {
      const productInfo = product.Product || {};
      return {
        Name: productInfo.MarketingName,
        Description: productInfo.ShortDescription,
        Allergens: Object.entries(productInfo.AvailableFilters || {})
                        .filter(([_, present]) => present)
                        .map(([allergen, _]) => allergen)
                        .join(', '),
        Calories: productInfo.Calories,
        ServingSize: `${productInfo.ServingSize} ${productInfo.ServingUnit}`,
      };
    });

    return menuItems;
  } catch (error) {
    console.error(error);
    return [];
  }
}
