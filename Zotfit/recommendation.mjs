import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OpenAI from 'openai';
import anteaterIcon from './assets/peter.jpg';

const Recommendation = ({ navigation, route }) => {
  const { selectedFoods, userInfo, selectedMeal } = route.params;
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchData = async (mealType) => {
      const openai = new OpenAI({
        apiKey: "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" // Add your OpenAI API key here
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
        console.log('selectedMeal:', selectedMeal);
        const prompt = `Given the foods the user consumed today: ${selectedFoods.join(", ")} and user details: ${JSON.stringify(userInfo)}, as well as user's energy information: activive energy is 190 cal today and walked a total of 11,107 steps, with a sleeping hour of 8hour 13min.
                    Provide a specific meal recommendation with more than 3 items. Recommendations should be chosen from this list (the format of this list is food name + carories): 
                    ${foodList}
                    Please follow this format:

                    First Paragraph(3-4 sentences max, make sure to have a title for the first paragraph like "Meal Recommendation" or "Food Recommendation" etc.): 
                    Hello <user name>. Based on your energy information and food consumed today, I recommend you to have <food name> ----- <calories> calories (with bullet points) for your next meal. This is a good choice because <reason>.
                    
                    Second Paragraph(3-4 sentences max, make sure to have a title for the second paragraph like "Recommend Sports" or "Recommend Exercise" etc.):
                    You should also do some <sports> (use bullet points)today, <reasons>.
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

    fetchData();
  }, [selectedFoods, userInfo]);

  


  return (
    <View style={styles.container}>
      <Image source={anteaterIcon} style={styles.icon} />
      <View style={styles.header}>
        <Text style={styles.recommendationText}>Peter's Recommendation</Text>
      </View>
      <Text>{recommendation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  recommendationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Recommendation;
