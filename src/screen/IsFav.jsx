 



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from '../components/Header';

// const HomeScreen = () => {
//   const [favorites, setFavorites] = useState([]);

//   const alertFun = ()=>{
//     Alert.alert('database not connected');
//   }

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.getItem('favorites');
//       if (storedFavorites !== null) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error("Error loading favorites from AsyncStorage:", error);
//     }
//   };

//   const renderFavoriteItem = ({ item }) => (
//     <>
//     <View style={styles.itemContainer}>
//       <Image
//         source={{ uri: item.image }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={styles.textContainer}>
//         <Text style={styles.text}>{item.title}</Text>
//         <Text style={styles.price}>₹{item.price}</Text>
//       </View> 

//       <TouchableOpacity style={styles.removebtn}>
//       <Text style={styles.removetxt}  >-</Text>
//       </TouchableOpacity>
 
//     </View>
//     </>
    
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Header />

//       <FlatList
//         data={favorites}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderFavoriteItem}
//       />
//       <TouchableOpacity onPress={alertFun} style={styles.favButton} >
//         <Text style={styles.favText}  >
//           Order
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent:'space-around', 
//     alignItems: 'center',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 10,
//   },
//   image: {
//     width: 140,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft:60
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   favButton:{
//     width:'100%',
//     padding:10, 
//     marginTop:20,
//     marginBottom:50,textAlign:'center',justifyContent:'center',
    
//     backgroundColor:'#0077b6',
//     borderRadius:10
//   },
//   favText:{
//     fontWeight:'bold',
//     textAlign:'center',
//     fontSize:24,
//     color:'white' 
//   },
//   removebtn:{
//     backgroundColor:'#0077b6',
//     padding:5,
//     borderRadius:2, 
//   },
//   removetxt:{
//     fontWeight:'bold',
//     fontSize:25,
//     color:'white', 
//     justifyContent:'center',
//     alignItems:'center'
//   }
// });

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const HomeScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const alertFun = () => {
    Alert.alert('Database not connected');
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from AsyncStorage:", error);
    }
  };

  const removeFavorite = async (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage:", error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View> 
      <TouchableOpacity style={styles.removebtn} onPress={() => removeFavorite(item.id)}>
        <Text style={styles.removetxt}>-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavoriteItem}
      />
      <TouchableOpacity onPress={alertFun} style={styles.favButton}>
        <Text style={styles.favText}>Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 60
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  favButton: {
    width: '100%',
    padding: 10, 
    marginTop: 20,
    marginBottom: 50,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077b6',
    borderRadius: 10
  },
  favText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  },
  removebtn: {
    backgroundColor: '#0077b6',
    padding: 5,
    borderRadius: 2, 
  },
  removetxt: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white', 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
