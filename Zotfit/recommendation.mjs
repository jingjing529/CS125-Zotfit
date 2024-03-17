import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet, Image } from 'react-native';
import OpenAI from 'openai';
import anteaterIcon from './assets/peter.jpg';
import { MaterialIcons } from '@expo/vector-icons'; 
const backgroundImage = require('./assets/UCI_bg.jpg');


const Recommendation = ({ navigation, route }) => {
  const { selectedFoods, userInfo, liveinfo, selectedMeal } = route.params;
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedFoods, userInfo, liveinfo]);

  const fetchData = async () => {
    const openai = new OpenAI({
      apiKey: "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" 
    });
    
    const findNextMeal = (selectedMeal) => {
      const mealOrder = ['b', 'l', 'd', 'm'];
      const currentIndex = mealOrder.indexOf(selectedMeal);
      const nextIndex = (currentIndex + 1) % mealOrder.length;
      return mealOrder[nextIndex];
    };

    try {
      const response = await fetch(`http://localhost:3000/menu?mealType=${findNextMeal(selectedMeal)}`);
      const data = await response.json();
      const foodList = data.map(item => `${item.name} + ${item.calories}`).join('\n');
      const prompt = `Given the foods the user consumed today: ${selectedFoods.join(", ")} and user details: ${JSON.stringify(userInfo)}, as well as user's energy information: ${JSON.stringify(liveinfo)}.
                  Provide a specific meal recommendation with more than 3 items. Recommendations should be chosen from this list (the format of this list is food name + carories): 
                  ${foodList}
                  Please follow this format:
                  (write only 3 meals to recommend in the format "<Food> with <Calories> Calories")
                  (write only3 sports or exercise to recommend)
                  (resons for suggesting this base on user's personal info and energy information, please follow the format of: summarizing user's health conditions in just one sentence, not detailed. And the reason for the recommendation, no more than 50 words)
                  `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
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

  const regenerateRecommendation = () => {
    fetchData();
  };

  const renderRecommendation = () => {
    if (!recommendation) return null;
    const sections = recommendation.split(/\n{2,}/);
    return (
      <View style={styles.recommendationContainer}>
        {sections.map((section, index) => {
          let sectionTitle = "";
          if (index === 0) {
            sectionTitle = "Meal Recommendation";
          } else if (index === 1) {
            sectionTitle = "Recommend Sports/Exercise";
          } else {
            sectionTitle = "Recommendation Reasons";
          }
          return (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              <Text style={styles.sectionText}>{section}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    <View style={styles.container}>
      {/* <Image source={anteaterIcon} style={styles.icon} /> */}
      <View style={styles.header}>
        <Text style={styles.recommendationText}>Recommendations</Text>
        <TouchableOpacity style={styles.button} onPress={regenerateRecommendation}>
          <MaterialIcons name="refresh" size={20} color='#fff' />
        </TouchableOpacity>
      </View>
      {renderRecommendation()}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
  },
  // icon: {
  //   width: 50,
  //   height: 50,
  //   marginRight: 10,
  // },
  recommendationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  recommendationContainer: {
    // marginTop: 20,
    borderWidth: 1,
    borderColor: '#fff', 
    borderRadius: 10,
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff', 
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  sectionText: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});


export default Recommendation;
