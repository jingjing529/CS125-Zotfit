import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.menuText}>Menu</Text>
      <Button title="Go to Recommendation" onPress={() => navigation.navigate('Recommendation')} />
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
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Menu;
