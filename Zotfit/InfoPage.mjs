import React, {useState, useEffect} from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library
import OpenAI from 'openai';

export default function InfoPage({ route, navigation }) {
  const { name, age, gender, height, weight } = route.params;

  // Placeholder for other information such as calories input, etc.
  const otherInformation = "Other information will be displayed here.";

  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const openai = new OpenAI({
        apiKey: "" // Add your OpenAI API key here
      });

      try {
        const prompt = [{role: "user", content: `I am ${name}, and I am a ${gender}. Given my personal details: ${height}, ${age} years old, ${weight}, and a menu of pizza, salad, and pasta. Recommend a meal for me today, along with any other health recommendation you may have.`}];
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: prompt,
        });

        if (completion.choices && completion.choices.length > 0 && completion.choices[0].message.content) {
          setRecommendation(completion.choices[0].message.content);
        } else {
          console.error('No recommendation received');
        }
      } catch (error) {
        console.error('Error fetching meal recommendation:', error);
      }
    };

    fetchData();
  }, [name, age, gender, height, weight]); 

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
        <Text>Other information will be displayed here.</Text>
        {/* Display the recommendation if it exists */}
        {recommendation && (
          <>
            <Text style={styles.recommendationHeading}>Meal Recommendation:</Text>
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </>
        )}
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
});
