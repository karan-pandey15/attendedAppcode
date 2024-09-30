 
import React, { useContext } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cartItems, deleteCartItem } = useContext(CartContext);
  const navigation = useNavigation(); 
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0); 
  const gstPercentage = 0.18; 
  const gstAmount = totalPrice * gstPercentage; 
  const totalAmount = totalPrice + gstAmount;

  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };

  const checkoutbtn = () => {
    Alert.alert("database not connected...")
    
  };


  const gotoShop = () => {
    navigation.navigate("HOME");
  };

  return (
   <>
   <Header />
   <View  style={styles.container}> 
      {cartItems.length === 0 ? (
        <View>
          <View style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            <Text style={styles.emptyCartText}>Oops! Your Cart is Empty</Text>
            <TouchableOpacity style={styles.cartbutton} onPress={gotoShop} >
              <Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}} >Goto Shop</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContentContainer}>
            <View style={styles.flexRowContainer}>
              <Text style={styles.titleText}>Total:</Text>
              <Text style={styles.priceText}>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.titleText}>GST:</Text>
              <Text style={styles.priceText}>₹{gstAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.flexRowContainer}>
              <Text style={styles.titleText}>Grand Total:</Text>
              <Text style={[styles.priceText, styles.grandPriceText]}>₹{totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      ) : (
      <> 
      <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartCard item={item} handleDelete={handleDeleteItem} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 40, paddingBottom: 200 }}
          ListFooterComponent={
            <>
              <View style={styles.bottomContentContainer}>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Total:</Text>
                  <Text style={styles.priceText}>₹{totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>GST:</Text>
                  <Text style={styles.priceText}>₹{gstAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Grand Total:</Text>
                  <Text style={[styles.priceText, styles.grandPriceText]}>₹{totalAmount.toFixed(2)}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={checkoutbtn}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          }
        />
      </>
      )}
    </View>
   </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({ 
  container: {
    padding: 15,
    backgroundColor:"#fff"
  },
  header: {},
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  cartbutton:{ 
   width:200,
   height:60,
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   marginTop:10,   
    backgroundColor: "#007AFF", 
   borderRadius:5,
   marginTop:20,
   color:'#fff',
   borderRadius:10
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#007AFF", 
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  emptyCartText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
    color:'#007AFF',
    fontWeight:'500'
  },
});
