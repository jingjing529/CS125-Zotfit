// MainScreen.js

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Button
            title="Go Back to Cover Page"
            onPress={() => navigation.navigate('Home')} // Navigate to the Home (cover page)
        />
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
});
