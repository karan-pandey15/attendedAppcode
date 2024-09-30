 



import React, { useState } from "react";
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const categories = [
  "Attended Driver",
  "Driving Teacher",
  "Gym Trainer",
  "Skating Trainer",
  "Boxing Coach",
  "Tuition Teacher",
  "Dance Teacher",
  "Lahanga",
  "Milk & Bread",
  "Grocery",
  "Kids School Lunch",
  "Solar Hotel",
  "Kids Fashion"
];

const SearchHeader = ({ height, width }) => {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const [filteredCategories, setFilteredCategories] = useState([]); // To store the filtered results
  const navigation = useNavigation(); // For navigation

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered); // Update the filtered categories
    } else {
      setFilteredCategories([]); // Reset the filtered list if the query is empty
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSearchQuery(category); // Set the search query to the selected category
    setFilteredCategories([]); // Clear the filtered list
    // Navigation based on the selected category (Use "#" for now)
    switch (category) {
      case "Attended Driver":
        navigation.navigate("#"); // Replace "#" with your actual page name
        break;
      case "Driving Teacher":
        navigation.navigate("DrivingTeacherScreen");
        break;
      case "Gym Trainer":
        navigation.navigate("TrainerScreen");
        break;
      case "Skating Trainer":
        navigation.navigate("SkatingTrainerScreen");
        break;
      case "Boxing Coach":
        navigation.navigate("BoxingCoachScreen");
        break;
      case "Tuition Teacher":
        navigation.navigate("#");
        break;
      case "Dance Teacher":
        navigation.navigate("DanceTeacherScreen");
        break;
      case "Lahanga":
        navigation.navigate("#");
        break;
      case "Milk & Bread":
        navigation.navigate("MilkBreadScreen");
        break;
      case "Grocery":
        navigation.navigate("GrceryScreen");
        break;
      case "Kids School Lunch":
        navigation.navigate("#");
        break;
      case "Solar Enquiry":
        navigation.navigate("SolarEnquiryScreen");
        break;
      case "Kids Fashion":
        navigation.navigate("#");
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.searchContainer, { height: height, width: width }]}>
        {/* Search Icon */}
        <Ionicons name="search-outline" size={20} color="#a9a9a9" style={styles.icon} />

        {/* Search Input Field */}
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search for Attendant, Driver ..."
          placeholderTextColor="#a9a9a9"
          style={styles.input}
        />

        {/* Camera Icon */}
        <Ionicons name="camera-outline" size={20} color="#a9a9a9" style={styles.icon} />

        {/* Microphone Icon */}
        <Ionicons name="mic-outline" size={20} color="#a9a9a9" style={styles.icon} />
      </View>

      {/* Display filtered categories */}
      {filteredCategories.length > 0 && (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item)}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.categoryList}
        />
      )}
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center", // Ensures the component is centered horizontally
    marginBottom:5,

    marginTop:10
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginHorizontal: 5,
  },
  categoryList: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fff", // Light background for the list
    borderRadius: 10,
    maxHeight: 200, // Limit the list height to avoid overflow
  },
  categoryItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  categoryText: {
    fontSize: 16,
    color: "#007BFF", // Blue color to match the theme
  },
});
