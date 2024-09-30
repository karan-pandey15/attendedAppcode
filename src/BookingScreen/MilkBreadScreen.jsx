// import {
//     FlatList,
//     Image, 
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
// } from "react-native";
// import React, { useState } from "react";
// import LinearGradient from "react-native-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import data from "../data/data.json"
// import Header from "../components/Header";
// import Tags from "../components/Tags";
// import ProductCard from "../components/ProductCard";

// const MilkBreadScreen = () => {
//     const [products, setProducts] = useState(data.products);
//     const navigation = useNavigation();
//     const handleProductDetails = (item) => {
//         navigation.navigate("PRODUCT_DETAILS", { item });
//     };
//     const toggleFavorite = (item) => {
//         setProducts(
//             products.map((prod) => {
//                 if (prod.id === item.id) {
//                     console.log("prod: ", prod);
//                     return {
//                         ...prod,
//                         isFavorite: !prod.isFavorite,
//                     };
//                 }
//                 return prod;
//             })
//         );
//     };

//     return (
//         <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
//             {/* header */}

//             {/* <Tags /> */}

//             <FlatList
//                 ListHeaderComponent={
//                     <>
//                         <> 
//                             <View>
//                                 <Text style={styles.headingText}>Match Your Style</Text>
//                                 <View style={styles.inputContainer}>
//                                     <Image
//                                         source={require("../assets/search.png")}
//                                         style={styles.searchIcon}
//                                     />
//                                     <TextInput placeholder="Search" style={styles.textInput} />
//                                 </View>
//                             </View>
//                         </>
//                         <Tags />
//                     </>
//                 }
//                 data={products}
//                 numColumns={2}
//                 renderItem={({ item }) => (
//                     <ProductCard
//                         item={item}
//                         handleProductClick={handleProductDetails}
//                         toggleFavorite={toggleFavorite}
//                     />
//                 )}
//                 showsVerticalScrollIndicator={false}
//             />
//             <View>
//                 {/* <Text>MilkBreadScreen</Text>
//           <Text>MilkBreadScreen</Text> */}
//             </View>
//         </LinearGradient>
//     );
// };

// export default MilkBreadScreen;

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         padding: 20,
//     },

//     headingText: {
//         fontSize: 28,
//         color: "#000000",
//         marginVertical: 20,
//         fontFamily: "Poppins-Regular",
//     },
//     inputContainer: {
//         width: "100%",
//         backgroundColor: "#FFFFFF",
//         height: 48,
//         borderRadius: 12,
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     searchIcon: {
//         height: 26,
//         width: 26,
//         marginHorizontal: 12,
//     },
//     textInput: {
//         fontSize: 18,
//         fontFamily: "Poppins-Regular",
//     },
// });



import {
    FlatList,
    Image, 
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import data from "../data/data.json";  // Assuming you have product data in this file
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const MilkBreadScreen = () => {
    const [products, setProducts] = useState(data.products);
    const navigation = useNavigation();
    
    const handleProductDetails = (item) => {
        navigation.navigate("PRODUCT_DETAILS", { item });
    };

    const toggleFavorite = (item) => {
        setProducts(
            products.map((prod) => {
                if (prod.id === item.id) {
                    return { ...prod, isFavorite: !prod.isFavorite };
                }
                return prod;
            })
        );
    };

    return (
        <>
        <Header />
        <View style={styles.container}>
           
            <FlatList
                ListHeaderComponent={
                    <View style={styles.header}>
                        {/* <View style={styles.inputContainer}>
                            <Image
                                source={require("../assets/search.png")}  // Update this path as needed
                                style={styles.searchIcon}
                            />
                            <TextInput placeholder="Search" style={styles.textInput} />
                        </View>
                         */}
                    </View>
                    
                }
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                    <ProductCard
                        item={item}
                        handleProductClick={handleProductDetails}
                        toggleFavorite={toggleFavorite}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
        </>
    );
};

export default MilkBreadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",  // Light blue background
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        marginBottom: 16,
    },
    headingText: {
        fontSize: 24,
        color: "#007AFF",  // Blue color for heading
        marginBottom: 12,
        fontFamily: "Poppins-SemiBold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",  // White background for search bar
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: "#007AFF",  // Blue search icon
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#000",
    },
    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
});
