import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const backgroundImage = require('./assets/UCI_bg.jpg');

const ChooseMeal = ({ navigation, route }) => {
  const { userInfo } = route.params;

  const handleMealSelect = (mealType) => {
    navigation.navigate('Menu', { userInfo, selectedMeal: mealType });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>What Was Your Last Meal?</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleMealSelect('b')}>
          <Text style={styles.buttonText}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleMealSelect('l')}>
          <Text style={styles.buttonText}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleMealSelect('d')}>
          <Text style={styles.buttonText}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleMealSelect('m')}>
          <Text style={styles.buttonText}>Midnight Snack</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ChooseMeal;
