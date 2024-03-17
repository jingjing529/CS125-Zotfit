import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const backgroundImage = require('./assets/UCI_bg.jpg');

const Menu = ({ navigation, route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const { userInfo, liveinfo, selectedMeal } = route.params;

  const totalCaloriesConsumed = selectedFoods.reduce((totalCalories, food) => {
    return totalCalories + parseInt(food.calories, 10);
  }, 0);

  useEffect(() => {
    fetchMenuItems(selectedMeal);
  }, []);

  const fetchMenuItems = async (mealType) => {
    try {
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

  // Determine meal type title
  let mealTypeTitle = '';
  if (selectedMeal === 'b') {
    mealTypeTitle = 'Breakfast';
  } else if (selectedMeal === 'l') {
    mealTypeTitle = 'Lunch';
  } else if (selectedMeal === 'd') {
    mealTypeTitle = 'Dinner';
  } else if (selectedMeal === 'm') {
    mealTypeTitle = 'Midnight Snack';
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.selectedFoodsHeader}>Food Consumed for <Text>{mealTypeTitle}</Text>: </Text>
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCaloriesLabel}>Total Calories Consumed:</Text>
            <Text style={styles.totalCaloriesValue}>{totalCaloriesConsumed}</Text>
          </View>
        <View style={styles.selectedFoodsContainer}>
          {selectedFoods.map((food, index) => (
            <View key={index} style={styles.selectedFoodItem}>
              <Text style={styles.selectedFoodName}>{food.name}</Text>
              <Text style={styles.selectedFoodCalories}>{food.calories} Calories</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedFoods([])}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#002856' }]} 
              onPress={() => navigation.navigate('Recommendation', { selectedFoods, userInfo, liveinfo, selectedMeal })}
            >
              <Text style={styles.buttonText}>Generate Recommendations</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.header}><Text>{mealTypeTitle}</Text>'s Menu</Text>
        <View style={styles.menuItemsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleFoodClick(item)} style={styles.foodItem}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodCalories}>{item.calories} Calories</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  header: {
    // marginTop: 40,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  selectedFoodsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  selectedFoodsHeader: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  selectedFoodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  selectedFoodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedFoodCalories: {
    fontSize: 14,
    color: '#666',
  },
  totalCaloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#90A0C1',
    borderRadius: 8,
    marginBottom: 10,
    color: '#002856',
  },
  totalCaloriesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalCaloriesValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
  button: {
    backgroundColor: '#90A0C1',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
    foodCalories: {
    fontSize: 14,
    color: '#666',
  },
  });
    
  export default Menu;
