import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

const Menu = ({ navigation, route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const { userInfo } = route.params;

  // Calculate total calories consumed
  const totalCaloriesConsumed = selectedFoods.reduce((totalCalories, food) => {
    const [_, calories] = food.split(' + ');
    return totalCalories + parseInt(calories, 10);
  }, 0);

  useEffect(() => {
    // Fetch the content of menu_items.txt when the component mounts
    fetchMenuItems('b');
  }, []);

  const fetchMenuItems = async (mealType) => {
    try {
      // Fetch menu items from API or local file
      const response = await fetch('http://localhost:3000/menu?mealType=${mealType}');
      const menuItemsContent = await response.json();
      setMenuItems(menuItemsContent.split('\n').map(line => line.trim()).filter(line => line !== ''));
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleFoodClick = (food) => {
    setSelectedFoods(prevSelectedFoods => [...prevSelectedFoods, food]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Today's Menu</Text>
      <View style={styles.selectedFoodsContainer}>
        <Text style={styles.selectedFoodsHeader}>Food you consumed today:</Text>
        {selectedFoods.filter(food => food.trim() !== '').map((food, index) => (
          <View key={index} style={styles.selectedFoodItem}>
            <Text>{food.split(' + ')[0]}</Text>
            <Text>{food.split(' + ')[1].trim()}</Text>
          </View>
        ))}
        <Text style={styles.totalCalories}>Total Calories Consumed: {totalCaloriesConsumed}</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        {menuItems.map((item, index) => {
          const [food, calories] = item.split(' + ');
          return (
            <TouchableOpacity key={index} onPress={() => handleFoodClick(item)} style={styles.foodItem}>
              <Text style={styles.foodName}>{food}</Text>
              <Text style={styles.foodCalories}>{calories} Calories</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button title="Start Generating Recommendations" onPress={() => navigation.navigate('Recommendation', {selectedFoods, userInfo})} />
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
