import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, PermissionsAndroid, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'; 
import Geolocation from 'react-native-geolocation-service'; // Import geolocation for location permission
import Contacts from 'react-native-contacts'; // Import contacts
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'; // Permissions library

const { width } = Dimensions.get('window'); // To make the image responsive

const WelcomeScreen = ({ setIsWelcomeScreenShown }) => { // Accept the prop to control the welcome screen

    const navigation = useNavigation(); // Hook to get navigation object
    const [permissionsGranted, setPermissionsGranted] = useState(false); // Track if permissions are granted

    // Function to handle button press
    const handleGetStarted = async () => {
        try {
            const cameraGranted = await requestCameraPermission();
            const locationGranted = await requestLocationPermission();
            const contactsGranted = await requestContactsPermission();

            if (cameraGranted && locationGranted && contactsGranted) {
                setPermissionsGranted(true);
                setIsWelcomeScreenShown(false); // Hide the welcome screen
                navigation.navigate('SecondScreen'); // Navigate to SecondScreen
            } else {
                Alert.alert('Permissions Denied', 'You need to grant all permissions to continue.');
            }
        } catch (error) {
            console.log('Error requesting permissions:', error);
        }
    };

    const requestCameraPermission = async () => {
        try {
            const result = await request(
                Platform.select({
                    ios: PERMISSIONS.IOS.CAMERA,
                    android: PERMISSIONS.ANDROID.CAMERA,
                })
            );
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.error('Error requesting camera permission:', error);
            return false;
        }
    };

    const requestLocationPermission = async () => {
        try {
            const result = await request(
                Platform.select({
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                })
            );
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    };

    const requestContactsPermission = async () => {
        try {
            const result = await request(
                Platform.select({
                    ios: PERMISSIONS.IOS.CONTACTS,
                    android: PERMISSIONS.ANDROID.READ_CONTACTS,
                })
            );
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.error('Error requesting contacts permission:', error);
            return false;
        }
    };

    return (
        <LinearGradient
            colors={['#007BFF', '#B0E0E6']}
            style={styles.container}
        >
            <View style={styles.topSection}>
                {/* Illustration */}
                <Image
                    source={require("../assets/partnerImg/welcomeScreen.png")} // Replace with your actual image
                    style={styles.image}
                />
            </View>

            <View style={styles.textSection}>
                {/* Title and Subtitle */}
                <Text style={styles.title}> Maras Partner</Text>
                <Text style={styles.subtitle}>Made in India By ❤️</Text>
            </View>

            <View style={styles.indicatorSection}>
                {/* Pagination Dots */}
                <View style={styles.paginationDot} />
                <View style={styles.paginationDot} />
                <View style={styles.paginationDot} />
                <View style={styles.paginationDot} />
            </View>

            <View style={styles.bottomSection}>
                {/* Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetStarted} >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: width * 0.9, // Responsive width
    height: width * 0.9, // Keep image square
    resizeMode: 'contain',
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontWeight: "bold"
  },
  indicatorSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 5,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF', // Button color as shown in the image
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});
