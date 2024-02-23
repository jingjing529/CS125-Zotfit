import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Recommendation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.recommendationText}>Recommendation Page</Text>
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
