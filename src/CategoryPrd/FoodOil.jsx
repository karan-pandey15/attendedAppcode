 
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
    {
      "id": 1,
      "image": "https://up.yimg.com/ib/th?id=OIP.lSuvpL-VEuhFKVMNdbP3JwHaHa&pid=Api&rs=1&c=1&qlt=95&w=103&h=103",
      "title": "Fortune  Oil",
      "price": 130,
      "description": "Start your day with a bowl of delicious and nutritious Oats cooked in Fortune Cooking Oil, packed with vitamins and minerals."
    },
    {
      "id": 2,
      "image": "https://up.yimg.com/ib/th?id=OIP.VeZ4KvSOtGuzqMjRw2YqZwHaHa&pid=Api&rs=1&c=1&qlt=95&w=102&h=102",
      "title": "Mustard Oil ",
      "price": 110,
      "description": "Indulge in fluffy and golden pancakes cooked in Mustard Oil, topped with your favorite syrup or fruits for a delightful breakfast treat."
    },
    {
      "id": 3,
      "image": "https://tse3.mm.bing.net/th?id=OIP.s1ay_yj1rWvjali2tJvL9wHaHa&pid=Api&P=0&h=220",
      "title": " Olive Oil",
      "price": 66,
      "description": "Savor the creamy goodness of avocado on toasted bread, sprinkled with your favorite seasonings, and drizzled with Olive Oil for a healthy and satisfying breakfast."
    },
    {
      "id": 4,
      "image": "https://tse4.mm.bing.net/th?id=OIP.B7FJ6fjL54xR7F9TgpN2EAHaHa&pid=Api&P=0&h=220",
      "title": " Coconut Oil",
      "price": 38,
      "description": "Enjoy a refreshing and nutrient-packed smoothie bowl topped with granola, fruits, and nuts, prepared with Coconut Oil for a vibrant breakfast option."
    },
    {
      "id": 5,
      "image": "https://tse4.mm.bing.net/th?id=OIP.fPFwxmCv9hLWHMIDCIj5ZwHaHa&pid=Api&P=0&h=220",
      "title": "Sunflower Oil",
      "price": 44,
      "description": "Grab Soup muffins loaded with vegetables and cheese, cooked in Sunflower Oil, perfect for a protein-rich breakfast on busy mornings."
    }, 
    {
        "id": 6,
        "image": "https://up.yimg.com/ib/th?id=OIP.lSuvpL-VEuhFKVMNdbP3JwHaHa&pid=Api&rs=1&c=1&qlt=95&w=103&h=103",
        "title": "Fortune  Oil",
        "price": 130,
        "description": "Start your day with a bowl of delicious and nutritious Oats cooked in Fortune Cooking Oil, packed with vitamins and minerals."
      },
      {
        "id": 7,
        "image": "https://up.yimg.com/ib/th?id=OIP.VeZ4KvSOtGuzqMjRw2YqZwHaHa&pid=Api&rs=1&c=1&qlt=95&w=102&h=102",
        "title": "Mustard Oil ",
        "price": 110,
        "description": "Indulge in fluffy and golden pancakes cooked in Mustard Oil, topped with your favorite syrup or fruits for a delightful breakfast treat."
      },
      {
        "id": 8,
        "image": "https://tse3.mm.bing.net/th?id=OIP.s1ay_yj1rWvjali2tJvL9wHaHa&pid=Api&P=0&h=220",
        "title": " Olive Oil",
        "price": 66,
        "description": "Savor the creamy goodness of avocado on toasted bread, sprinkled with your favorite seasonings, and drizzled with Olive Oil for a healthy and satisfying breakfast."
      },
      {
        "id": 9,
        "image": "https://tse4.mm.bing.net/th?id=OIP.B7FJ6fjL54xR7F9TgpN2EAHaHa&pid=Api&P=0&h=220",
        "title": " Coconut Oil",
        "price": 38,
        "description": "Enjoy a refreshing and nutrient-packed smoothie bowl topped with granola, fruits, and nuts, prepared with Coconut Oil for a vibrant breakfast option."
      },
      {
        "id": 10,
        "image": "https://tse4.mm.bing.net/th?id=OIP.fPFwxmCv9hLWHMIDCIj5ZwHaHa&pid=Api&P=0&h=220",
        "title": "Sunflower Oil",
        "price": 44,
        "description": "Grab Soup muffins loaded with vegetables and cheese, cooked in Sunflower Oil, perfect for a protein-rich breakfast on busy mornings."
      }, 
  ];
  
  


const FoodOil = () => {
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
    height: 140,
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

export default FoodOil;
