 

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoundTagTwo = () => {
  const navigation = useNavigation();

  const handleImagePress = (screenName) => { 
    navigation.navigate(screenName);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <ImageContainer name="Drinks" imageSource={require('../assets/images/milk2.jpeg')} onPress={() => handleImagePress('MilkPrd')} />
          <ImageContainer name="Fresh Juice" imageSource={require('../assets/images/fruits-vegetables/All_vegetables.jpg')} onPress={() => handleImagePress('VegePrd')} />
          <ImageContainer name="Season Drinks" imageSource={require('../assets/images/fruits-vegetables/All_fruits.jpg')} onPress={() => handleImagePress('skincare')} />
          <ImageContainer name="Soft Drinks" imageSource={require('../assets/images/egg-meat-fish/set2_04.jpg')} onPress={() => handleImagePress('IceCreamScreen')} />
        </View>
        <View style={styles.row}>
        <ImageContainer name="Choklate" imageSource={require('../assets/images/Dairy__Bread._QL30_.jpg')} onPress={() => handleImagePress('DailuUsePrd')} />
          <ImageContainer name="Biscuit" imageSource={require('../assets/images/Instant-Food_new.jpg')} onPress={() => handleImagePress('NoodlesPrd')} />
          <ImageContainer name="Namkeen" imageSource={require('../assets/images/Oil_Masala__Sauces._QL30_.jpg')} onPress={() => handleImagePress('FoodOil')} />
          <ImageContainer name="Snaks" imageSource={require('../assets/images/Breakfast_Food_._QL30_.jpg')} onPress={() => handleImagePress('BreakFastPrd')} />
        </View>
      </View>
    </>
  );
};

const ImageContainer = ({ name, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 6
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop:10
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50, // Rounded corners
    overflow: 'hidden', // Clip the content to the rounded border
    // borderWidth:1,
    
  },
  image: {
    width: '100%',
    height: '125%',
    marginTop:4,
  },
  text: {
    marginTop: 5,
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RoundTagTwo;
