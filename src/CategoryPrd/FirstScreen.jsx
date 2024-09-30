// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// // Get device screen width and height to make responsive design
// const { width, height } = Dimensions.get('window');
// const FirstScreen = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [isValid, setIsValid] = useState(false);

//   const handleChange = (text) => {
//     // Only allow numbers
//     const formattedText = text.replace(/[^0-9]/g, '');
//     setMobileNumber(formattedText);
//     // Check if mobile number is exactly 10 digits
//     setIsValid(formattedText.length === 10);
//   };

//   const handleContinue = () => {
//     if (isValid) {
//       alert(`OTP will be sent to ${mobileNumber}`);
//       // Implement OTP verification logic here
//     } else {
//       alert('Please enter a valid 10-digit mobile number');
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#6c63ff', '#928DFF']}
//       style={styles.container}
//     >
//       <View style={styles.header}>
//         <Text style={styles.headerText}>MARAS</Text>
//         <Text style={styles.subHeaderText}>Login With Mobile phone</Text>
//         <Text style={styles.infoText}>
//           Enter your mobile number, we will send you OTP to verify
//         </Text>
//       </View>

//       <View style={styles.centerContent}>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={[styles.input, isValid ? styles.inputValid : styles.inputInvalid]}
//             keyboardType="numeric"
//             maxLength={10}
//             placeholder="+91 7776938444"
//             placeholderTextColor="#999"
//             value={mobileNumber}
//             onChangeText={handleChange}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.button, isValid ? styles.buttonActive : styles.buttonInactive]}
//           onPress={handleContinue}
//           disabled={!isValid}
//         >
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   header: {
//     marginTop: height * 0.1,  // Positioned the text near the top
//     alignItems: 'center',
//     marginBottom: 50,  // Added margin to separate from the rest of the content
//   },
//   headerText: {
//     fontSize: 30,  // Made the text larger for better emphasis
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   subHeaderText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#f2f2f2',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#f2f2f2',
//     textAlign: 'center',
//     marginTop: 10,
//     paddingHorizontal: 30,
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center', // Centers the content vertically
//     alignItems: 'center',      // Centers the content horizontally
//   },
//   inputContainer: {
//     alignItems: 'center',
//     marginBottom: 30,  // Margin between input and button
//     width:'100%'
    
//   },
//   input: {
//     width: '100%',
//     borderWidth: 2,
//     borderColor: '#fff',
//     borderRadius: 20,
//     fontSize: 18,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     textAlign: 'center',
//     elevation: 5, // For shadow on Android
//     shadowColor: '#000', // For shadow on iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   inputValid: {
//     borderColor: '#00e676', // Green when valid
//   },
//   inputInvalid: {
//     borderColor: '#d3d3d3', // Light gray when invalid
//     fontWeight:'bold',
//     fontSize:25
//   },
//   button: {
//     width: '85%',
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     elevation: 5, // For shadow on Android
//     shadowColor: '#000', // For shadow on iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   buttonActive: {
//     backgroundColor: '#00e676', // Green when active
//   },
//   buttonInactive: {
//     backgroundColor: '#d3d3d3', // Gray when inactive
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default FirstScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Get device screen width and height to make responsive design
const { width, height } = Dimensions.get('window');

const FirstScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (text) => {
    // Only allow numbers
    const formattedText = text.replace(/[^0-9]/g, '');
    setMobileNumber(formattedText);
    // Check if mobile number is exactly 10 digits
    setIsValid(formattedText.length === 10);
  };

  const handleContinue = () => {
    if (isValid) {
      alert(`OTP will be sent to ${mobileNumber}`);
      // Implement OTP verification logic here
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']} // Background white
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>MARAS</Text>
        <Text style={styles.subHeaderText}>Login With Mobile Phone</Text>
        <Text style={styles.infoText}>
          Enter your mobile number, we will send you an OTP to verify
        </Text>
      </View>

      <View style={styles.centerContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isValid ? styles.inputValid : styles.inputInvalid]}
            keyboardType="numeric"
            maxLength={10}
            placeholder="+91 7776938444"
            placeholderTextColor="#999"
            value={mobileNumber}
            onChangeText={handleChange}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isValid ? styles.buttonActive : styles.buttonInactive]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: height * 0.1, // Positioned the text near the top
    alignItems: 'center',
    marginBottom: 50, // Added margin to separate from the rest of the content
  },
  headerText: {
    fontSize: 30, // Made the text larger for better emphasis
    fontWeight: 'bold',
    color: '#000', // Black text for the header
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E90FF', // Blue for subheader
  },
  infoText: {
    fontSize: 16,
    color: '#000', // Black for info text
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 30, // Margin between input and button
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#000', // Black border for input
    borderRadius: 20,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
    elevation: 5, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputValid: {
    borderColor: '#1E90FF', // Blue when valid
  },
  inputInvalid: {
    borderColor: '#d3d3d3', // Light gray when invalid
  },
  button: {
    width: '85%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonActive: {
    backgroundColor: '#1E90FF', // Blue when active
  },
  buttonInactive: {
    backgroundColor: '#d3d3d3', // Gray when inactive
  },
  buttonText: {
    color: '#000', // Black text on button
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FirstScreen;
