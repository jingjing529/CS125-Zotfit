import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

const Menu = ({ navigation, route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('b');
  const { userInfo } = route.params;

  // Calculate total calories consumed
  const totalCaloriesConsumed = selectedFoods.reduce((totalCalories, food) => {
    return totalCalories + parseInt(food.calories, 10);
  }, 0);

  useEffect(() => {
    fetchMenuItems('b');
  }, []);

  const fetchMenuItems = async (mealType) => {
    try {
      // Fetch menu items from API or local file
      const response = await fetch(`http://localhost:3000/menu?mealType=${mealType}`);
      const menuItemsContent = await response.json();
      const menuItems = menuItemsContent.map(item => ({
        name: item.name,
        calories: item.calories
      }));
      setMenuItems(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleFoodClick = (food) => {
    setSelectedFoods(prevSelectedFoods => [...prevSelectedFoods, food]);
  };

  const handleMealSelect = (mealType) => {
    setSelectedMeal(mealType);
    fetchMenuItems(mealType);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Today's Menu</Text>
      <View style={styles.selectedFoodsContainer}>
        <Text style={styles.selectedFoodsHeader}>Food you consumed today:</Text>
        {selectedFoods.map((food, index) => (
          <View key={index} style={styles.selectedFoodItem}>
            <Text>{food.name}</Text>
            <Text>{food.calories} Calories</Text>
          </View>
        ))}
        <Text style={styles.totalCalories}>Total Calories Consumed: {totalCaloriesConsumed}</Text>
        <Button title="Clear All" onPress={() => setSelectedFoods([])} />
        <Button title="Start Generating Recommendations" onPress={() => navigation.navigate('Recommendation', {selectedFoods, userInfo, selectedMeal})} />
      </View>
      <View style={styles.menuTypesContainer}>
        <Button title="Breakfast" onPress={() => handleMealSelect('b')} />
        <Button title="Lunch" onPress={() => handleMealSelect('l')} />
        <Button title="Dinner" onPress={() => handleMealSelect('d')} />
        <Button title="Midnight" onPress={() => handleMealSelect('m')} />
      </View>
      <View style={styles.menuItemsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleFoodClick(item)} style={styles.foodItem}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodCalories}>{item.calories} Calories</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedFoodsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  selectedFoodsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedFoodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodCalories: {
    fontSize: 14,
    color: '#666',
  },
  totalCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItemsContainer: {
    width: '100%',
  },
  foodItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default Menu;
