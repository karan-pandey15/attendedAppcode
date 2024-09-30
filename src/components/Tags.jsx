 
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tags = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("All Products");
  const tags = ["All Products", "Skin Care", "Body Care", "Moisturizer", "Hair Spray"];

  const handleTagPress = (tag) => {
    setSelected(tag);
    if (tag !== "All Products") {
      // Navigate to next page or screen here
      navigation.navigate("skincare");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tags}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTagPress(item)}>
            <Text
              style={[
                styles.tagText,
                item === selected ? styles.isSelected : null,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#DFDCDC",
    color: "#938F8F",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#E96E6E",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 10,
  },
});
