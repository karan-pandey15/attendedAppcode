import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const images = [
    require('../assets/images/fruits-vegetables/mango_1500x300._SX1500_QL85_.jpg'),
    require('../assets/images/fruits-vegetables/Banner_PC._SX1500_QL85_.jpg'),
    require('../assets/images/fruits-vegetables/Beat_the_heat_PC._SX1500_QL85_.jpg'),
    require('../assets/images/fruits-vegetables/mango_1500x300._SX1500_QL85_.jpg')
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / windowWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { width: windowWidth }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 160, // Adjust height as needed
  },
});

export default BannerSlider;
