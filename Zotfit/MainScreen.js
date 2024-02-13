import React, { useState } from 'react';
import { View, Button, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library

export default function MainScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Initialize gender state
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

    // Navigate to InfoPage.js
    navigation.navigate('InfoPage', {
      name: name,
      age: age,
      gender: gender,
      height: `${feet} feet ${inches} inches`,
      weight: `${weight} lbs`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="arrow-back" size={24}/>
        </TouchableOpacity>
      </View>
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
          <MaterialIcons name="male" size={40} color={gender === 'male' ? '#007bff' : '#000000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={selectFemale}>
          <MaterialIcons name="female" size={40} color={gender === 'female' ? '#ff007f' : '#000000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={selectOther}>
          <MaterialIcons name="other-h" size={40} color={gender === 'other' ? '#ff4500' : '#000000'} />
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
      <Button
        title="Submit"
        onPress={handleSubmit}
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
    borderColor: '#ccc',
    borderRadius: 5,
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
});
