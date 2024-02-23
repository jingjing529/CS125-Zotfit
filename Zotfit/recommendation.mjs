import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import OpenAI from 'openai';

const Recommendation = ({ navigation, route }) => {
  const { selectedFoods, userInfo } = route.params;
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const openai = new OpenAI({
        apiKey: "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" // Add your OpenAI API key here
      });

      try {
        const prompt = `Given the foods the user consumed today: ${selectedFoods.join(", ")} and user details: ${JSON.stringify(userInfo)}. 
                        Provide a meal recommendation. Please follow this format: Greeting the user first, then make a comment on 
                        the user's food consumption today with some suggestions, try to limit the length of the response, not too long.
                        Most importantly, it must let the user feel it's personal and friendly. And then provide some recommendation the user
                        should do today. For example, if the user consumes too much calories today, then make some recommendation of some sports
                        or fruits they can digest later in order to balance it off. Overall, try to be friendly and personal. We need to make
                        the response as friendly as possible like a health doctor to their patient. Moreover, don't use large paragraphs in your response.
                        Try to use bullet points or short sentences if possible.`;
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
      <Text style={styles.recommendationText}>Recommendation Page</Text>
      <Text>{recommendation}</Text>
      <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  recommendationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Recommendation;
