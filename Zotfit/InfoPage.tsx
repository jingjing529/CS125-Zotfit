import React, { FC, useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
const backgroundImage = require('./assets/UCI_bg.jpg');
interface InfoPageProps {
  route: {
    params: {
      name: string;
      age: string;
      gender: string;
      height: string;
      weight: string;
    };
  };
  navigation: any; // Adjust the type according to your navigation setup
}

const InfoPage: FC<InfoPageProps> = ({ route, navigation }) => {
  const { name, age, gender, height, weight } = route.params;
  // const PERMS = AppleHealthKit.Constants.Permissions;
  const caloriesBurned = 190;
  const totalSteps = 11107;
  const heartRate = 74;

  // const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
  // const [totalSteps, setTotalSteps] = useState<number | null>(null);
  // const [heartRate, setHeartRate] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchHealthData = async () => {
  //     const options = {
  //       unit: 'bpm',
  //       startDate: new Date().toISOString(),
  //       endDate: new Date().toISOString(),
  //       ascending: false, // Sort in descending order to get the latest value first
  //       limit: 1, // Limit to only one sample
  //     };

  //     try {
  //       const energyBurned = await getActiveEnergyBurned(options);
  //       setCaloriesBurned(energyBurned);

  //       const stepsCount = await getStepCount(options);
  //       setTotalSteps(stepsCount);

  //       const hr = await getHeartRate(options);
  //       setHeartRate(hr[0]?.value || null);
  //     } catch (error) {
  //       console.error('Error fetching health data:', error);
  //     }
  //   };

  //   fetchHealthData();
  // }, []);

  // const getActiveEnergyBurned = async (options: any): Promise<number> => {
  //   return new Promise((resolve, reject) => {
  //     AppleHealthKit.getActiveEnergyBurned(options, (err: Object, results: HealthValue[]) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const energyBurned = results.reduce((total, sample) => total + sample.value, 0);
  //         resolve(energyBurned);
  //       }
  //     });
  //   });
  // };

  // const getStepCount = async (options: any): Promise<number> => {
  //   return new Promise((resolve, reject) => {
  //     AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(results.value);
  //       }
  //     });
  //   });
  // };

  // const getHeartRate = async (options: any): Promise<HealthValue[]> => {
  //   return new Promise((resolve, reject) => {
  //     AppleHealthKit.getHeartRateSamples(options, (err: Object, results: HealthValue[]) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('./assets/anteater.png')}
          style={styles.avatar}
        />
        <Text style={styles.heading}>User Profile</Text>
        <View style={styles.userInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Name:</Text>
            <Text style={styles.infoText}>{name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Age:</Text>
            <Text style={styles.infoText}>{age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Gender:</Text>
            <Text style={styles.infoText}>{gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Height:</Text>
            <Text style={styles.infoText}>{height}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Weight:</Text>
            <Text style={styles.infoText}>{weight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Calories Burnt:</Text>
            <Text style={styles.infoText}>{caloriesBurned}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Total Steps:</Text>
            <Text style={styles.infoText}>{totalSteps}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Heart Rate:</Text>
            <Text style={styles.infoText}>{heartRate}</Text>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={() => 
          navigation.navigate('ChooseMeal', { 
            userInfo: { 
              name, 
              age, 
              gender, 
              height, 
              weight 
            }, 
            liveinfo: { 
              caloriesBurned, 
              totalSteps, 
              heartRate 
            } 
          })}>  
          <Text style={styles.menuButtonText}>Select Food Consumed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  userInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    width: '90%', // Adjust the width as needed
    backgroundColor: '#ffffff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    textAlign: 'right',
  },
  menuButton: {
    marginTop: 20,
    backgroundColor: '#002856',
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InfoPage;

