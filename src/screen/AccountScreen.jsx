import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../utils/fonts";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('https://api.stylishhim.com/api/get_customer_data', {
          method: 'GET',
          credentials: 'include',
        });

        const res = await response.json();

        if (res.Status === 'Success') {
          setAuth(true);
          setName(res.name);
          setEmail(res.email);
          setPhone(res.phone);
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomerData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://api.stylishhim.com/api/cust_logout', {
        method: 'GET',
        credentials: 'include',
      });

      const res = await response.json();

      if (res.Status === 'Success') {
        await AsyncStorage.clear();
        setAuth(false);
        navigation.navigate('signup');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    navigation.navigate("HOME");
  };

  const handleFav = () => {
    navigation.navigate("isfav");
  };

  const handleShare = () => {
    navigation.navigate("ReferShare");
  };

  const handleOrder = () => {
    navigation.navigate("REORDER");
  };

  const handleLogin = () => {
    navigation.navigate("UserSignin");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Maras</Text>
        <View>
          <Image
            source={require("../assets/account.png")}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/account.png")}
          style={styles.userImg}
        />
        <Text style={styles.textHeading}>{auth ? name : "Undefined"}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsTxt}>{auth ? phone : "Undefined"}</Text>
        <Text style={styles.detailsTxt}>{auth ? email : "Undefined"}</Text>
      </View>

      <View style={styles.drawerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <View style={styles.screenDrawer}>
            <Image
              source={require("../assets/favoriteFilled.png")}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerTxt}>Share With Friends</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFav}>
          <View style={styles.screenDrawer}>
            <Image
              source={require("../assets/favorite.png")}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerTxt}>Your Favorite Item</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOrder}>
          <View style={styles.screenDrawer}>
            <Image
              source={require("../assets/apps.png")}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerTxt}>Wallet</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.screenDrawer}>
            <Image
              source={require("../assets/apps.png")}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerTxt}>Edit Your Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.screenDrawer}>
            <Image
              source={require("../assets/settincicoon.png")}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerTxt}>Settings</Text>
          </View>
        </TouchableOpacity>

        {auth ? (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.logoutContainer}>
              <Image
                source={require("../assets/loguticon.png")}
                style={styles.drawerIcon}
              />
              <Text style={styles.logoutTxt}>Logout</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <View style={styles.loginContainer}>
              <Image
                source={require("../assets/loguticon.png")}
                style={styles.drawerIcon}
              />
              <Text style={styles.loginTxt}>Login</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  appBackIcon: {
    height: 24,
    width: 24,
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: "#000000",
    fontWeight: "bold",
  },
  profileImage: {
    height: 25,
    width: 25,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  textHeading: {
    color: "#111",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 15,
  },
  details: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  detailsTxt: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 5,
    textAlign: "center",
    color: "#555",
  },
  drawerContainer: {
    marginTop: 30,
  },
  screenDrawer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  drawerIcon: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
  drawerTxt: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#007BFF", // Blue color for logout
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#007BFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  loginButton: {
    backgroundColor: "#007BFF", // Blue color for login
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
    marginBottom:20,
    elevation: 5,
    shadowColor: "#007BFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

  },
  logoutTxt: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 18,
  },
  loginTxt: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 18,
  },
});