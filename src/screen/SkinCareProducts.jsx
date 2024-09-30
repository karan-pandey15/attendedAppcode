import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample data; replace this with an import if your data is in a separate file
const data = [
  {
    "id": 1,
    "image": "https://tse3.explicit.bing.net/th?id=OIP.XprgHSCfPgHBpfQBBfAWqwHaFb&pid=Api&P=0&h=220",
    "title": "Apple",
    "price": 99,
    "description": "A fresh and juicy apple, perfect for a healthy snack."
  },
  {
    "id": 2,
    "image": "https://tse4.mm.bing.net/th?id=OIP.nbEw_CbJuIQxfMNkc0hxfAHaFw&pid=Api&P=0&h=220",
    "title": "Banana",
    "price": 100,
    "description": "Ripe bananas, rich in potassium and great for energy."
  },
  {
    "id": 3,
    "image": "https://tse2.mm.bing.net/th?id=OIP.qL-HErFkUTvb43i9cmZvFQHaGP&pid=Api&P=0&h=220",
    "title": "Watermelon",
    "price": 59,
    "description": "A refreshing watermelon, ideal for a hot summer day."
  },
  {
    "id": 4,
    "image": "https://tse3.mm.bing.net/th?id=OIP.C2yRvmtMBxguk0l6W6bTTgHaGI&pid=Api&P=0&h=220",
    "title": "pomegranate",
    "price": 129,
    "description": "Crunchy peanuts, perfect for snacking or adding to dishes."
  },
  {
    "id": 5,
    "image": "https://tse3.mm.bing.net/th?id=OIP.KNHJ3Zj5fMpWo1Hhs97uDwHaF7&pid=Api&P=0&h=220",
    "title": "Grapes",
    "price": 90,
    "description": "Sweet and juicy grapes, a delightful treat."
  },
  {
    "id": 6,
    "image": "https://tse3.explicit.bing.net/th?id=OIP.XprgHSCfPgHBpfQBBfAWqwHaFb&pid=Api&P=0&h=220",
    "title": "Apple",
    "price": 49,
    "description": "Crisp and delicious apples, perfect for pies or eating fresh."
  },
  {
    "id": 7,
    "image": "https://tse4.mm.bing.net/th?id=OIP.nbEw_CbJuIQxfMNkc0hxfAHaFw&pid=Api&P=0&h=220",
    "title": "Banana",
    "price": 199,
    "description": "A bunch of ripe bananas, great for smoothies or snacks."
  },
  {
    "id": 8,
    "image": "https://tse2.mm.bing.net/th?id=OIP.qL-HErFkUTvb43i9cmZvFQHaGP&pid=Api&P=0&h=220",
    "title": "Watermelon",
    "price": 499,
    "description": "Large and juicy watermelon, perfect for family gatherings."
  },
  {
    "id": 9,
    "image": "https://tse3.mm.bing.net/th?id=OIP.C2yRvmtMBxguk0l6W6bTTgHaGI&pid=Api&P=0&h=220",
    "title": "pomegranate ",
    "price": 929,
    "description": "Premium quality peanuts, ideal for snacking and cooking."
  },
  {
    "id": 10,
    "image": "https://tse3.mm.bing.net/th?id=OIP.KNHJ3Zj5fMpWo1Hhs97uDwHaF7&pid=Api&P=0&h=220",
    "title": "Grapes",
    "price": 590,
    "description": "A large bunch of grapes, perfect for desserts and snacks."
  }
];


const SkinCareProducts = () => {
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
    height: 100,
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

export default SkinCareProducts;
