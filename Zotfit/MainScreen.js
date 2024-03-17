import React, { useState } from 'react';
import { View, Button, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const backgroundImage = require('./assets/UCI_bg.jpg');

export default function MainScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); 
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');

  // Define functions to handle gender selection
  const selectMale = () => setGender('male');
  const selectFemale = () => setGender('female');
  const selectOther = () => setGender('other');

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Height:', feet, 'feet', inches, 'inches');
    console.log('Weight:', weight, 'lbs');

    navigation.navigate('InfoPage', {
      name: name,
      age: age,
      gender: gender,
      height: `${feet} feet ${inches} inches`,
      weight: `${weight} lbs`,
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Information</Text>
        {/* <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="arrow-back" size={24} color="#fff"/>
          </TouchableOpacity>
        </View> */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={selectMale}>
            <MaterialIcons name="male" size={40} color={gender === 'male' ? '#007bff' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={selectFemale}>
            <MaterialIcons name="female" size={40} color={gender === 'female' ? '#ff007f' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={selectOther}>
            <MaterialIcons name="question-mark" size={40} color={gender === 'other' ? '#ff4500' : '#fff'} />
          </TouchableOpacity>
        </View>
        <View style={styles.heightContainer}>
          <TextInput
            style={[styles.input, { width: '40%' }]}
            placeholder="Feet"
            onChangeText={setFeet}
            value={feet}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '40%' }]}
            placeholder="Inches"
            onChangeText={setInches}
            value={inches}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Weight (lbs)"
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    color: '#fff',
    // backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#90A0C1',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

