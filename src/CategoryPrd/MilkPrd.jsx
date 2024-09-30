 
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    {
      "id": 1,
      "image": "https://tse1.mm.bing.net/th?id=OIP.vqRbhd5sppo3G8kWTsKfcgHaHa&pid=Api&P=0&h=220", 

      "title": "Amul Milk",
      "price": 63,
      "description": "Amul Milk is fresh, pure, and rich in nutrients, perfect for your daily needs."
    },
    {
      "id": 2,
      "image": "https://tse4.mm.bing.net/th?id=OIP.w7GDoUSErpmmPviKxQSoDQHaHa&pid=Api&P=0&h=220", 
      
      "title": "Amul Tazza",
      "price": 70,
      "description": "Amul Tazza Dairy Milk offers a creamy and wholesome experience with every glass."
    },
    {
      "id": 3,
      "image": "https://tse3.mm.bing.net/th?id=OIP.rCaYUIS4xGuvUTX64vTZ8AHaHa&pid=Api&P=0&h=220", 
      "title": "Fresh Milk",
      "price": 55,
      "description": "Mother Dairy Fresh Milk is sourced from healthy cows, ensuring top quality and taste."
    },
    {
      "id": 4,
      "image": "https://tse4.mm.bing.net/th?id=OIP.d_I5gkwzj8vG6CsbF4iAEAHaHg&pid=Api&P=0&h=220", 
      
      "title": "Mother Dairy",
      "price": 65,
      "description": "Daily Delight Milk is perfect for your family, providing essential nutrients daily."
    },
    {
      "id": 5,
      "image": "https://tse1.mm.bing.net/th?id=OIP.v1In3MZC8ZAPTwC-ywZxKwHaHh&pid=Api&P=0&h=220",  
      "title": "NutriMilk",
      "price": 75,
      "description": "NutriMilk is fortified with vitamins and minerals for a healthy lifestyle."
    },
    {
      "id": 6,
      "image": "https://tse3.mm.bing.net/th?id=OIP.2FOIUgGBqeqWps1Ls-XJDAHaHa&pid=Api&P=0&h=220", 
      
      "title": "Healthy Cow Milk",
      "price": 50,
      "description": "Healthy Cow Milk comes from well-cared cows, ensuring purity and quality."
    },
    {
      "id": 7,
      "image": "https://tse2.mm.bing.net/th?id=OIP.byJhnVcLCx08WRkIXvovAgHaHa&pid=Api&P=0&h=220",  
      "title": "Golden Milk",
      "price": 80,
      "description": "Golden Milk is rich and creamy, ideal for drinking and cooking."
    },
    {
      "id": 8,
      "image": "https://tse1.mm.bing.net/th?id=OIP.gfKmrnV0vLEE_Lgl8eUfjAHaHc&pid=Api&P=0&h=220", 
      
      "title": "Full Cream Milk",
      "price": 90,
      "description": "PureGold Milk ensures high quality with every drop, great for your family's health."
    },
 
      {
        "id": 9,
        "image": "https://tse4.mm.bing.net/th?id=OIP.w7GDoUSErpmmPviKxQSoDQHaHa&pid=Api&P=0&h=220", 
        
        "title": "Amul Tazza",
        "price": 70,
        "description": "Pure Dairy Milk offers a creamy and wholesome experience with every glass."
      },
      {
        "id": 10,
        "image": "https://tse3.mm.bing.net/th?id=OIP.rCaYUIS4xGuvUTX64vTZ8AHaHa&pid=Api&P=0&h=220", 
        "title": "Fresh Milk",
        "price": 55,
        "description": "Farm Fresh Milk is sourced from healthy cows, ensuring top quality and taste."
      },
  ];
  


const MilkPrd = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [favorites, setFavorites] = useState([]);

 

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

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage:", error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toggleFavorite = (item) => {
    const isFavorited = favorites.some(fav => fav.id === item.id);
    let updatedFavorites;

    if (isFavorited) {
      updatedFavorites = favorites.filter(fav => fav.id !== item.id);
    } else {
      updatedFavorites = [...favorites, item];
    }

    saveFavorites(updatedFavorites);
  };

  const handleImagePress = (item) => {
    navigation.navigate('ProductDetail', { item });
  };

  return (
    <View style={{ backgroundColor: "#fff",marginBottom:60 }}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/search.png")}
          style={styles.searchIcon}
        />
        <TextInput 
          placeholder="Search" 
          style={styles.textInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <ImageContainer
            name={item.title}
            imageSource={{ uri: item.image }}
            price={item.price}
            onPress={() => handleImagePress(item)}
            onAdd={() => toggleFavorite(item)}
          />
        )}
      />
    </View>
  );
};

const ImageContainer = ({ name, imageSource, price, onPress, onAdd, description }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.price}>₹{price}</Text>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row", 
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 16,
    backgroundColor: '#fff'
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: 140,
    height: 130,
    marginBottom: 10
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    padding: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default MilkPrd;
