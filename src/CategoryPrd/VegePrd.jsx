 
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    {
      "id": 1,
      "image": "https://up.yimg.com/ib/th?id=OIP.NQoblU6aVDk4w-pjm_mqRgHaGD&pid=Api&rs=1&c=1&qlt=95&w=125&h=102", 
      "title": "Carrot",
      "price": 40,
      "description": "Fresh and crunchy carrots, rich in vitamins and perfect for your salads and snacks."
    },
    {
      "id": 2,
      "image": "https://up.yimg.com/ib/th?id=OIP.HbLIdLN9EBACai1-prScYgHaHi&pid=Api&rs=1&c=1&qlt=95&w=115&h=117", 
      "title": "Broccoli",
      "price": 55,
      "description": "Nutrient-packed broccoli, known for its health benefits and versatile use in various dishes."
    },
    {
      "id": 3,
      "image": "https://up.yimg.com/ib/th?id=OIP.MIhh6wGi3kXh6m0sAzOhhAHaIl&pid=Api&rs=1&c=1&qlt=95&w=101&h=117", 
      "title": "Spinach",
      "price": 30,
      "description": "Fresh spinach, a superfood rich in iron and essential nutrients, perfect for salads and smoothies."
    },
    {
      "id": 4,
      "image": "https://up.yimg.com/ib/th?id=OIP.shx5oZu0R9vusEcjcJmljQHaGS&pid=Api&rs=1&c=1&qlt=95&w=134&h=113", 
      "title": "Bell Pepper",
      "price": 45,
      "description": "Colorful bell peppers, packed with antioxidants and vitamins, great for stir-fries and salads."
    },
    {
      "id": 5,
      "image": "https://tse1.mm.bing.net/th?id=OIP.xFMguZS6XpHwV8m4rL9kPgHaGm&pid=Api", 
      "title": "Tomato",
      "price": 25,
      "description": "Juicy and flavorful tomatoes, rich in lycopene and perfect for sauces, salads, and sandwiches."
    },
    {
      "id": 6,
      "image": "https://tse4.mm.bing.net/th?id=OIP.tk7a-a8Sy9xxx6YbejIYagHaHd&pid=Api&P=0&h=220", 
      "title": "Cabbage",
      "price": 35,
      "description": "Crunchy cabbage, low in calories and high in fiber, great for coleslaw and stir-fries."
    },
    {
      "id": 7,
      "image": "", 
      "title": "Cauliflower",
      "price": 50,
      "description": "Versatile cauliflower, rich in vitamins and minerals, perfect for roasting, grilling, or as a low-carb rice substitute."
    },
    {
      "id": 8,
      "image": "https://tse3.mm.bing.net/th?id=OIP.8QoB2z6mXpiWVr5_DUcQMQHaHa&pid=Api&P=0&h=220", 
      "title": "Beetroot",
      "price": 40,
      "description": "Nutrient-rich beetroot, known for its vibrant color and health benefits, perfect for salads and smoothies."
    },
    {
      "id": 9,
      "image": "https://tse1.explicit.bing.net/th?id=OIP.p1ypzNrrK0Xuh1fmQ7k8PgHaF-&pid=Api&P=0&h=220", 
      "title": "onion",
      "price": 60,
      "description": "Fresh zucchini, low in calories and rich in vitamins, perfect for grilling, sautéing, or as a pasta alternative."
    },
    {
      "id": 10,
      "image": "https://tse3.mm.bing.net/th?id=OIP.Ga1uduSQIeB9pPI5SMgLUQHaEs&pid=Api&P=0&h=220", 
      "title": "Chilli",
      "price": 45,
      "description": "Chilli, known for its meaty texture and mild flavor, perfect for grilling, roasting, or in stews."
    }
  ];
  
  


const VegePrd = () => {
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

export default VegePrd;
