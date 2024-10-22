import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for icons

const Header = ({ isCart }) => {
  const navigation = useNavigation(); // Hook to access navigation

  const handleBack = () => {
    navigation.navigate("HOME");
  };

  const handleCartNavigate = () => {
    navigation.navigate("#"); // Navigate to Cart screen
  };

  const handleFavoritesNavigate = () => {
    navigation.navigate("isfav"); // Navigate to Favorites/Wishlist screen
  };

  const handleProfileNavigate = () => {
    navigation.navigate("ACCOUNT"); // Navigate to Profile screen
  };

  return (
    <View style={styles.header}>
      {/* Back button, only shown if isCart is true */}
      {isCart ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
      ) : (
        <Text style={styles.applogo}>MARAS</Text>
      )}

      {/* Centered title, only shown if isCart is true */}
      {isCart ? <Text style={styles.titleText}>My Cart</Text> : <View style={{ flex: 1 }} />}

      {/* Right side icons (Cart, Wishlist, Profile) */}
      <View style={styles.rightIconsContainer}>
        {/* Cart Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={handleCartNavigate}>
  <Ionicons name="notifications-outline" size={24} color="#007BFF" />
</TouchableOpacity>

        {/* Favorites/Wishlist Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={handleFavoritesNavigate}>
          <Ionicons name="heart-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
        {/* Profile Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={handleProfileNavigate}>
          <Ionicons name="person-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF", // Keep background white for a clean look
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light gray border at the bottom for subtle division
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Gentle shadow to give depth
  },
  backButton: {
    backgroundColor: "#F0F0F0", // Slightly lighter background for the button
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  applogo: {
    color: "#007BFF", // Blue color for the logo text to match the overall theme
    fontSize: 26, // Slightly larger for a bold brand statement
    fontWeight: "bold",
    letterSpacing: 1, // Adds a bit of spacing to make the logo stand out
    textShadowColor: "#D0D0D0", // Subtle text shadow for logo
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: "#007BFF", // Blue color to match overall theme
    textAlign: "center",
    textTransform: "uppercase", // Uppercase for a modern look
    letterSpacing: 1.2, // Slight spacing for elegance
  },
  rightIconsContainer: {
    flexDirection: "row", // Icons arranged in a row
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#F0F0F0", // Light background for contrast
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: "#007BFF", // Border to highlight the icons
    borderWidth: 1,
  },
});
