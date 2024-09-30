 
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
    {
      "id": 1,
      "image": "https://tse4.mm.bing.net/th?id=OIP.gPiH_knGygV-tNm8FXvgPwHaHa&pid=Api&P=0&h=220",
      "title": "Maggi",
      "price": 14,
      "description": "Maggi Noodles: A quick and delicious snack loved by people of all ages."
    },
    {
      "id": 2,
      "image": "https://tse2.mm.bing.net/th?id=OIP.x_VmeftKrYR5y58hn1mm-QHaEp&pid=Api&P=0&h=220",
      "title": "Yippee ",
      "price": 12,
      "description": "Yippee Noodles: Tasty and convenient noodles for a satisfying meal experience."
    },
    {
      "id": 3,
      "image": "https://tse4.mm.bing.net/th?id=OIP.9yZn02n415wyDbBWz_SwMwHaJ4&pid=Api&P=0&h=220",
      "title": "C Noodles",
      "price": 50,
      "description": "C Noodles: Delicious noodles that are easy to cook and packed with flavor."
    },
    {
      "id": 4,
      "image": "https://tse1.mm.bing.net/th?id=OIP.0sIjmqlYimSgUNfH_nNDNQHaHa&pid=Api&P=0&h=220",
      "title": "Family Pack",
      "price": 75,
      "description": "Noodles Delight: Indulge in the goodness of these delightful noodles for a satisfying meal."
    },
    {
      "id": 5,
      "image": "https://tse4.mm.bing.net/th?id=OIP.RDuKwbfuSfLdi68UTbvWlQHaHa&pid=Api&P=0&h=220",
      "title": "NutriNoodles",
      "price": 25,
      "description": "NutriNoodles: Nutritious and flavorful noodles that make a perfect meal option for any time of the day."
    },
    {
      "id": 6,
      "image": "https://tse1.mm.bing.net/th?id=OIP.hWjexZSrBZsLzI8bAI2_mQHaHa&pid=Api&P=0&h=220",
      "title": "Healthy Noodles",
      "price": 45,
      "description": "Healthy Noodles: Enjoy the goodness of these healthy noodles, made with wholesome ingredients."
    },
    {
      "id": 7,
      "image": "https://tse1.mm.bing.net/th?id=OIP.hWjexZSrBZsLzI8bAI2_mQHaHa&pid=Api&P=0&h=220",
      "title": "Golden Noodles",
      "price": 75,
      "description": "Golden Noodles: Delightful and satisfying noodles that add a golden touch to your mealtime."
    },
    {
      "id": 8,
      "image": "https://tse1.mm.bing.net/th?id=OIP.wEwPQxqGMtzJ1gZDd8hSOAAAAA&pid=Api&P=0&h=220",
      "title": "Pure Noodle ",
      "price": 80,
      "description": "Pure Noodle Gold: Premium quality noodles for an exquisite dining experience."
    },
    {
      "id": 9,
      "image": "https://tse4.mm.bing.net/th?id=OIP.RDuKwbfuSfLdi68UTbvWlQHaHa&pid=Api&P=0&h=220",
      "title": "Noodles",
      "price": 60,
      "description": "Yippee Noodles: Enjoy the rich flavor and texture of these delicious noodles."
    },
    {
      "id": 10,
      "image": "https://tse2.mm.bing.net/th?id=OIP.x_VmeftKrYR5y58hn1mm-QHaEp&pid=Api&P=0&h=220",
      "title": "Crisp Noodles",
      "price": 55,
      "description": "Crisp Noodles: Crispy and delicious noodles that make a perfect snack or meal option."
    }
  ];
  


const NoodlesPrd = () => {
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

export default NoodlesPrd;
