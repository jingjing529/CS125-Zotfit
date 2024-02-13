import React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library

export default function InfoPage({ route, navigation }) {
  const { name, age, gender, height, weight } = route.params;

  // Placeholder for other information such as calories input, etc.
  const otherInformation = "Other information will be displayed here.";

  return (
    <View style={styles.container}>
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
        {/* Display other information */}
        <Text>{otherInformation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  },
});
