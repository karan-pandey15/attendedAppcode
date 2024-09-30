 


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { fonts } from "../utils/fonts";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Signup = () => {
//   const navigation = useNavigation();
//   const [showPassword, setShowPassword] = useState(false);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleBack = () => {
//     navigation.navigate("HOME");
//   };

//   const handleSignin = () => {
//     navigation.navigate("signin");
//   };

//   // const handleRegister = async () => {
//   //   try {
//   //     // Save form data to AsyncStorage
//   //     await AsyncStorage.setItem("formData", JSON.stringify(formData));
//   //     // Navigate to another page
//   //     Alert.alert('register successFull...')
//   //     navigation.navigate("HOME");
//   //   } catch (error) {
//   //     console.error("Error saving data: ", error);
//   //     Alert.alert("Error", "Failed to register. Please try again.");
//   //   }
//   // };


//   const handleRegister = async () => {
//     // Check if any required field is empty
//     if (!formData.name || !formData.email || !formData.phone || !formData.password) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }
  
//     try {
//       // Save form data to AsyncStorage
//       await AsyncStorage.setItem("formData", JSON.stringify(formData));
//       // Navigate to another page
//       Alert.alert('Registration successfull');
//       navigation.navigate("HOME");
//     } catch (error) {
//       console.error("Error saving data: ", error);
//       Alert.alert("Error", "Failed to register. Please try again.");
//     }
//   };
  

//   const handleChange = (key, value) => {
//     setFormData({
//       ...formData,
//       [key]: value,
//     });
//   };

//   return (
//     <ScrollView>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack}>
//           <Image
//             source={require("../assets/arrowback.png")}
//             style={styles.appBackIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.titleText}>StylishHim</Text>
//         <View>
//           <Image
//             source={require("../assets/favoriteFilled.png")}
//             style={styles.profileImage}
//           />
//         </View>
//       </View>
//       <View style={styles.RegisterContainer}>
//         <ScrollView
//           style={styles.RegisterBox}
//           showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
//         >
//           <View style={styles.imgContainer}>
//             <Text style={styles.heading}>Signup Now</Text>
//             <Text style={styles.paragraph}>
//               Enter Your Name, Email & Password To
//             </Text>
//             <Text style={styles.paragraph}>Create an account</Text>
//           </View>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Name"
//               value={formData.name}
//               required
//               onChangeText={(text) => handleChange("name", text)}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Enter Email"
//               value={formData.email}
//               onChangeText={(text) => handleChange("email", text)}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Enter Phone No"
//               value={formData.phone}
//               required
//               onChangeText={(text) => handleChange("phone", text)}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Enter Password"
//               secureTextEntry={!showPassword}
//               value={formData.password}
//               required
//               onChangeText={(text) => handleChange("password", text)}
//             />

//             <TouchableOpacity onPress={togglePasswordVisibility}>
//               <Text
//                 style={{
//                   marginLeft: 10,
//                   marginBottom: 20,
//                   fontWeight: "bold",
//                   color: "#111",
//                 }}
//               >
//                 {showPassword ? "Hide" : "Show"} Password
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={{ fontSize: 20, color: "#fff" }}>Register</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleSignin} style={{marginBottom:20,marginTop:5}} >
//             <Text style={{color:"#111",fontWeight:'bold'}}>
//               Already have an account?{" "}
//               <Text style={{color:"blue",fontSize:18,borderBottomWidth:1}}>
//                 Login
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBack = () => {
    navigation.navigate("HOME");
  };

  const handleSignin = () => {
    navigation.navigate("signin");
  };

  const handleRegister = async () => {
    // Check if any required field is empty
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    try {
      // Send form data to the API
      const response = await fetch('https://api.stylishhim.com/api/cust_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
  
      if (response.ok) {
        // Save email to AsyncStorage
        await AsyncStorage.setItem("email", formData.email);
        // Navigate to another page
        Alert.alert('Registration successful');
        navigation.navigate("HOME");
      } else {
        Alert.alert('Error', result.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };
  

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>StylishHim</Text>
        <View>
          <Image
            source={require("../assets/favoriteFilled.png")}
            style={styles.profileImage}
          />
        </View>
      </View>
      <View style={styles.RegisterContainer}>
        <ScrollView
          style={styles.RegisterBox}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        >
          <View style={styles.imgContainer}>
            <Text style={styles.heading}>Signup Now</Text>
            <Text style={styles.paragraph}>
              Enter Your Name, Email & Password To
            </Text>
            <Text style={styles.paragraph}>Create an account</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Phone No"
              value={formData.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />

            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text
                style={{
                  marginLeft: 10,
                  marginBottom: 20,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {showPassword ? "Hide" : "Show"} Password
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={{ fontSize: 20, color: "#fff" }}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignin} style={{marginBottom:20,marginTop:5}} >
            <Text style={{color:"#111",fontWeight:'bold'}}>
              Already have an account?{" "}
              <Text style={{color:"blue",fontSize:18,borderBottomWidth:1}}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "#FCF2DC",

    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  applogo: {
    color: "#111",
    fontSize: 24,
    fontWeight: "bold",
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
    marginTop: 8,
  },
  profileImage: {
    height: 25,
    width: 25,
    marginTop: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FCF7EE",
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: "#000000",
    fontWeight: "bold",
  },
  RegisterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF2DC",
    height: "100%",
  },
  RegisterBox: {
    marginTop: 20,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    height: 200,
    width: 250,
    borderRadius: 50,
    marginTop: 14,
  },
  heading: {
    marginTop: 15,
    fontSize: 25,
    color: "#111",
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  input: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: "black",
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 0,
    width: "100%",
    color: "#111",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  button: {
    height: 60,
    width: 340,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#DCAC85",
    color: "#fff",
    borderRadius: 10,
    alignSelf: "center", // Center the button horizontally
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    marginRight: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  SocialImg: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
