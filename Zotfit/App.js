import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import InfoPage from './InfoPage';
import Menu from './menu';
import Recommendation from './recommendation.mjs';
import ChooseMeal from './ChooseMeal';
import UciLogo from './assets/Anteater-Chief.png';


const Stack = createStackNavigator();
const backgroundImage = require('./assets/UCI_bg.jpg');


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Recommendation" component={Recommendation} />
        <Stack.Screen name="ChooseMeal" component={ChooseMeal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
    // Animation for the title
    const titleAnimation = new Animated.Value(0);
    Animated.timing(titleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleAnimation,
            transform: [
              {
                translateY: titleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
      >
        Zotfit
      </Animated.Text>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <Image source={UciLogo} style={styles.logo} />
    </View>
    </ImageBackground>
  );
}

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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#90A0C1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 200,
    marginTop: 50,
  },
});
