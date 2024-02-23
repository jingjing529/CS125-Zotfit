import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OpenAI from 'openai';
import anteaterIcon from './assets/peter.jpg';

const Recommendation = ({ navigation, route }) => {
  const { selectedFoods, userInfo } = route.params;
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const openai = new OpenAI({
        apiKey: "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" // Add your OpenAI API key here
      });

      try {
        const prompt = `Given the foods the user consumed today: ${selectedFoods.join(", ")} and user details: ${JSON.stringify(userInfo)}, as well as user's energy information: activive energy is 190 cal today and walked a total of 11,107 steps, with a sleeping hour of 8hour 13min.
                        Provide a specific meal recommendation with more than 3 items. Recommendations should be chosen from this list (the format of this list is food name + carories): 
                        Assorted Donuts + 90
                        Blueberry Muffin + 340
                        Blueberry Scone + 150
                        Breakfast Muffin + 400
                        Cinnamon Roll + 130
                        Danish Pastry + 120
                        Vegan Zucchini Muffin + 220
                        Cinnamon Brown Sugar Granola (6  fl oz) + 370
                        Old Fashioned Oatmeal (6  fl oz) + 110
                        Overnight Apples 'N' Oats (6  fl oz) + 190
                        Overnight Strawberry Oats + 150
                        Whipped Butter + 0
                        Whipped Cream Cheese + 0
                        French Toast + 1810
                        Scrambled Eggs + 180
                        Turmeric Tofu Scramble + 220
                        Fresh Squeezed Orange Juice + 45
                        Cottage Cheese + 0
                        Nonfat Strawberry Yogurt + 0
                        Nonfat Vanilla Greek Yogurt + 0
                        Nonfat Vanilla Yogurt + 0
                        Fresh Berries Cup + 30
                        Orange Wedges + 0
                        Raisins + 0
                        Fresh Orange + 45
                        Lyonnaise Potatoes + 120
                        Pork Sausage Links + 240
                        Turkey Sausage Patty + 90
                        Please follow this format: 
                        Hello <user name>, I see you have consumed <foods> today. Based on your energy information, I recommend you to have <food name> ----- <calories> calories (with bullet points) for your next meal. This is a good choice because <reason>. You should also do some <sports> (use bullet points)today, <reasons>.
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
