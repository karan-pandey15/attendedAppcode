// ProductDetail.js
import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import Header from '../components/Header';

const ProductDetail = ({ route }) => {
  const { item } = route.params;

  const alertFun = () => {
    Alert.alert('Database not connected UE');
  };

  return (
    <View style={{backgroundColor:'#FFF'}} >
     <View style={{padding:20}} >
     {/* <Header /> */}
     </View>
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={alertFun} style={styles.favButton}>
        <Text style={styles.favText}>Add To Bag</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  image: {
    width: 310,
    height: 260,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:15
  },
  price: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
    // textAlign: 'center',
    marginTop: 30,
  }
  ,
  favButton: {
    width: '80%',
    padding: 10, 
    marginTop: 20,
    marginBottom: 50,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077b6',
    borderRadius: 10,
    marginLeft:40
  },
  favText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  },
});

export default ProductDetail;
