 
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {
    "id": 1,
    "image": "https://up.yimg.com/ib/th?id=OIP.30eaBFXJdPdKBJ37sq0rHQHaHa&pid=Api&rs=1&c=1&qlt=95&w=110&h=110", 
    "title": "Shampoo",
    "price": 99,
    "description": "A gentle and nourishing shampoo for all hair types."
  },
  {
    "id": 2,
    "image": "https://up.yimg.com/ib/th?id=OIP.Ym6KQ0AYCDheGEl5S5VUfAHaE8&pid=Api&rs=1&c=1&qlt=95&w=157&h=105",
    "title": "Soap",
    "price": 100,
    "description": "A moisturizing soap that leaves your skin feeling soft and refreshed."
  },
  {
    "id": 3,
    "image": "https://up.yimg.com/ib/th?id=OIP.osWh_zwazksTuRNWnMkcGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=123&h=123",
    "title": "Toothpaste",
    "price": 59,
    "description": "A fluoride toothpaste for strong teeth and fresh breath."
  },
  {
    "id": 4,
    "image": "https://up.yimg.com/ib/th?id=OIP.qnGrK98EdS3kb2TDOxCDLwHaHa&pid=Api&rs=1&c=1&qlt=95&w=106&h=106", 
    "title": "Conditioner",
    "price": 129,
    "description": "A rich conditioner that detangles and nourishes your hair."
  },
  {
    "id": 5,
    "image": "https://up.yimg.com/ib/th?id=OIP.g0vOK98A8uRIIKZzaNtDDQHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121",
    "title": "Handwash",
    "price": 90,
    "description": "A refreshing handwash that kills germs and leaves hands soft."
  },
  {
    "id": 6,
    "image": "https://up.yimg.com/ib/th?id=OIP.wVJTC_UbuBoesqAJy7o7aQHaGL&pid=Api&rs=1&c=1&qlt=95&w=140&h=116",
    "title": "Detergent",
    "price": 49,
    "description": "A powerful detergent that removes stains and brightens clothes."
  },
  {
    "id": 7,
    "image": "https://up.yimg.com/ib/th?id=OIP.Zn7-MZz8CRfnbZxPiP16FgHaHa&pid=Api&rs=1&c=1&qlt=95&w=107&h=107",
    "title": "Dishwash Liquid",
    "price": 199,
    "description": "A concentrated dishwash liquid that cuts through grease effectively."
  },
  {
    "id": 8,
    "image": "https://up.yimg.com/ib/th?id=OIP.mDiZ-m0xIwyE3eUvigN-WAHaHa&pid=Api&rs=1&c=1&qlt=95&w=110&h=110",
    "title": "Mouthwash",
    "price": 499,
    "description": "A minty mouthwash that freshens breath and promotes oral health."
  },
  {
    "id": 9,
    "image": "https://up.yimg.com/ib/th?id=OIP.Bk_RAyrZbzz7Zl9N69gIkQHaHa&pid=Api&rs=1&c=1&qlt=95&w=111&h=111",
    "title": "Body Lotion",
    "price": 929,
    "description": "A hydrating body lotion that nourishes and smooths your skin."
  },
  {
    "id": 10,
    "image": "https://tse2.mm.bing.net/th?id=OIP.cnEAUlD353knpIExNnqDgwHaHa&pid=Api&P=0&h=220",
    "title": "Face Wash",
    "price": 590,
    "description": "A gentle face wash that cleanses and revitalizes your skin."
  }
];



const DailuUsePrd = () => {
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

export default DailuUsePrd;
