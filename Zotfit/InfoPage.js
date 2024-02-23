import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library

export default function InfoPage({ route, navigation }) {
  const { name, age, gender, height, weight } = route.params;

  const caloriesBurned = 190;
  const totalSteps = 11107;
  const sleepingHours = "8 h 13 min";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('./assets/anteater.png')}
          style={styles.avatar}
        />
        <Text style={styles.heading}>User Profile</Text>
        <View style={styles.userInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Name:</Text>
            <Text style={styles.infoText}>{name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Age:</Text>
            <Text style={styles.infoText}>{age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Gender:</Text>
            <Text style={styles.infoText}>{gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Height:</Text>
            <Text style={styles.infoText}>{height}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Weight:</Text>
            <Text style={styles.infoText}>{weight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Calories Burned:</Text>
            <Text style={styles.infoText}>{caloriesBurned}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Total Steps:</Text>
            <Text style={styles.infoText}>{totalSteps}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Sleeping Hours:</Text>
            <Text style={styles.infoText}>{sleepingHours}</Text>
          </View>
          {/* Button to navigate to Menu */}
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Menu', { userInfo: { name, age, gender, height, weight } })}>
            <Text style={styles.menuButtonText}>Select Food Consumed</Text>
          </TouchableOpacity>
        </View>
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
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    textAlign: 'right',
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
