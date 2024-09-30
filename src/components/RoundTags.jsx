

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoundTags = () => {
  const navigation = useNavigation();

  const handleImagePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Title for "Our Services" */}
      <Text style={styles.sectionTitle}>
        Our Services
      </Text>

      <View style={styles.row}>
        <ImageContainer name="Attendant" imageSource={require('../assets/images/helper.jpg')} onPress={() => handleImagePress('#')} />
        <ImageContainer name="Driver" imageSource={require('../assets/images/taxi.jpeg')} onPress={() => handleImagePress('DriverScreen')} />
        <ImageContainer name="Driving Teacher" imageSource={require('../assets/images/driver.jpeg')} onPress={() => handleImagePress('DrivingTeacherScreen')} />
        <ImageContainer name="Gym Trainer" imageSource={require('../assets/images/gym.jpeg')} onPress={() => handleImagePress('TrainerScreen')} />
      </View>

      <View style={styles.row}>
        <ImageContainer name="Skating Trainer" imageSource={require('../assets/images/skating.jpeg')} onPress={() => handleImagePress('SkatingTrainerScreen')} />
        <ImageContainer name="Boxing Coach" imageSource={require('../assets/images/boxing.jpeg')} onPress={() => handleImagePress('BoxingCoachScreen')} />
        <ImageContainer name="Tution Teacher" imageSource={require('../assets/images/tutionteacher.jpeg')} onPress={() => handleImagePress('TeacherScreen')} />
        <ImageContainer name="Dance Teacher" imageSource={require('../assets/images/danceteacher.jpeg')} onPress={() => handleImagePress('DanceTeacherScreen')} />
      </View>

      {/* <View style={styles.row}>
        <ImageContainer name="Lahanga Try & Buy" imageSource={require('../assets/images/lahnga.jpg')} onPress={() => handleImagePress('#')} />
        <ImageContainer name="Solar Enquiry" imageSource={require('../assets/images/solar.jpg')} onPress={() => handleImagePress('#')} />
        

      </View> */}

      <View style={styles.leftrow}>
        <ImageContainer
          name="Nurse- Injection/Dressing"
          imageSource={require('../assets/images/nurse.jpeg')}
          onPress={() => handleImagePress('NurseScreen')}
        />

        <ImageContainer
          name="Solar Enquiry"
          imageSource={require('../assets/images/solar.jpg')}
          onPress={() => handleImagePress('SolarEnquiryScreen')}
        />
      </View>



      {/* Title for "Our Product" */}
      <Text style={styles.sectionTitle}>
        Fresh Dairy Products
      </Text>

      <View style={styles.row}>
        <ImageContainer name="Milk & Bread" imageSource={require('../assets/images/milkimgg.jpg')} onPress={() => handleImagePress('MilkBreadScreen')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />


      </View>


      <Text style={styles.sectionTitle}>
        Daily Grocery
      </Text>

      <View style={styles.row}>
        <ImageContainer name="Grocery" imageSource={require('../assets/images/grceryimg.jpg')} onPress={() => handleImagePress('GrceryScreen')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />



      </View>


      <Text style={styles.sectionTitle}>
        Healthy Food
      </Text>

      <View style={styles.row}>
        <ImageContainer name="Kids School Lunch" imageSource={require('../assets/images/kidstiffin.jpg')} onPress={() => handleImagePress('KidsLunchScreen')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />
        <ImageContainer name=" Coming Soon" imageSource={require('../assets/images/comingsoon.png')} onPress={() => handleImagePress('#')} />




      </View>



      <Text style={styles.sectionTitle}>
        Hotel Booking
      </Text>

      {/* <ImageContainer name="Nurse" imageSource={require('../assets/images/tutionteacher.jpeg')} onPress={() => handleImagePress('#')} /> */}
    </View>
  );
};

const ImageContainer = ({ name, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,          // Larger text size
    fontWeight: 'bold',    // Bold text
    color: '#333',         // Darker color for contrast
    marginVertical: 10,    // Margin above and below the text
    textAlign: 'left',     // Align text to the left
    width: '100%',         // Full width
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Distribute space evenly between items
    marginBottom: 20,
    width: '100%',
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.2,  // 20% of screen width to ensure responsive design
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.1,  // Fully rounded (half of width/height)
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
    color: '#111',
    fontSize: 14,
    fontWeight: 'bold',
    width: Dimensions.get('window').width * 0.2,  // Ensure text stays within the width of the image
  },
  leftrow: {
    flexDirection: 'row', // Align images in a row
    justifyContent: 'flex-start', // Align to the left
    marginRight: 150, // Gap from the left side of the screen
  },


});

export default RoundTags;
