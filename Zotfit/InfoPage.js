import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library

export default function InfoPage({ route, navigation }) {
  const { name, age, gender, height, weight } = route.params;

  // Placeholder for other information such as calories input, etc.
  const otherInformation = "Other information will be displayed here.";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>User Profile</Text>
      <View style={styles.userInfo}>
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
        <Text>Gender: {gender}</Text>
        <Text>Height: {height}</Text>
        <Text>Weight: {weight}</Text>
        {/* Placeholder for other information */}
        <Text>{otherInformation}</Text>
        {/* Button to navigate to Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Menu', { userInfo: { name, age, gender, height, weight } })}>
          <Text style={styles.menuButtonText}>Select Food Consumed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    width: '90%', // Adjust the width as needed
  },
  recommendationHeading: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  recommendationText: {
    marginTop: 10,
    fontSize: 16,
  },
  menuButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
