import React, { FC } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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

var AppleHealthKit = require('react-native-apple-healthkit');

const InfoPage: FC<InfoPageProps> = ({ route, navigation }) => {
  const { name, age, gender, height, weight } = route.params;
  // const PERMS = AppleHealthKit.Constants.Permissions;
  const caloriesBurned = 190;
  const totalSteps = 11107;
  const sleepingHours = "8 h 13 min";

  let options = {
    permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
        write: ["Weight", "StepCount", "BodyMassIndex"]
    }
};
  // AppleHealthKit.initHealthKit(options, (err: Object, res: Object) => {
  //   if(err) {
  //       console.log("error initializing healthkit: ", err);
  //       return;
  //   }
  //   // healthkit initialized...
  // });

  // const healthKitOptions = {
  //   permissions: {
  //       read:  [
  //           PERMS.StepCount,
  //           PERMS.Height,
  //       ],
  //   }
  // };
  
  // const permissions = {
  //   permissions: {
  //     read: [AppleHealthKit.Constants.Permissions.HeartRate],
  //     write: [AppleHealthKit.Constants.Permissions.Steps],
  //   },
  // } as HealthKitPermissions
  
  // AppleHealthKit.initHealthKit(permissions, (error: string) => {
  //   /* Called after we receive a response from the system */
  
  //   if (error) {
  //     console.log('[ERROR] Cannot grant permissions!')
  //   }
  
  //   /* Can now read or write to HealthKit */
  
  //   const options = {
  //     startDate: new Date(2020, 1, 1).toISOString(),
  //   }
  
  //   AppleHealthKit.getHeartRateSamples(
  //     options,
  //     (callbackError: string, results: HealthValue[]) => {
  //       /* Samples are now collected from HealthKit */
  //     },
  //   )
  // })

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
            <Text style={styles.infoTitle}>Calories Burned:</Text>
            <Text style={styles.infoText}>{caloriesBurned}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Total Steps:</Text>
            <Text style={styles.infoText}>{totalSteps}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Sleeping Hours:</Text>
            <Text style={styles.infoText}>{sleepingHours}</Text>
          </View>
          {/* Button to navigate to Menu */}
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ChooseMeal', { userInfo: { name, age, gender, height, weight } })}>
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

