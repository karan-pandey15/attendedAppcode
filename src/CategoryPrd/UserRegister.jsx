// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../components/Header';

// const UserRegister = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address, setAddress] = useState('');
//     const [city, setCity] = useState('');
//     const [pin, setPin] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigation = useNavigation();

//     const register = async () => {
//         // Reset error message
//         setError('');
        
//         // Basic Validation (e.g., Ensure all fields are filled)
//         if (!name || !email || !phone || !address || !city || !pin || !password) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         try {
//             // Make API call to register the user
//             const response = await axios.post('http://localhost:5000/api/users/register', {
//                 name, email, phone, address, city, pin, password,
//             });

//             // Destructure the token and userId from the response
//             const { token, userId } = response.data;

//             // Store token and userId in AsyncStorage
//             await AsyncStorage.setItem('token', token);
//             await AsyncStorage.setItem('userId', userId);

//             // Show success alert
//             Alert.alert('Registration Successful', `Your User ID: ${userId}`);

//             // Navigate to the Login screen
//             navigation.navigate('UserSignin');
//         } catch (error) {
//             // Display error from the response or default error message
//             const errorMessage = error.response?.data?.message || 'Registration Failed';
//             setError(errorMessage);
//             console.log('Error during registration:', errorMessage);
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <Header />
//             <KeyboardAvoidingView
//                 style={styles.container}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             >
//                 <View style={styles.formContainer}>
//                     <Text style={styles.header}>User Register</Text>
//                     {error ? <Text style={styles.errorText}>{error}</Text> : null}

//                     <TextInput
//                         placeholder="Name"
//                         value={name}
//                         onChangeText={setName}
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Phone"
//                         value={phone}
//                         onChangeText={setPhone}
//                         keyboardType="phone-pad"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Address"
//                         value={address}
//                         onChangeText={setAddress}
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="City"
//                         value={city}
//                         onChangeText={setCity}
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="PIN Code"
//                         value={pin}
//                         onChangeText={setPin}
//                         keyboardType="numeric"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Password"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                         style={styles.input}
//                     />

//                     <TouchableOpacity style={styles.button} onPress={register}>
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => navigation.navigate('UserSignin')}>
//                         <Text style={styles.linkText}>
//                             Already have an account? Sign In
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         backgroundColor: '#f8f8f8',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     formContainer: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#ffffff',
//         padding: 20,
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#333',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 12,
//         borderRadius: 5,
//         marginBottom: 15,
//         backgroundColor: '#f8f8f8',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         paddingVertical: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     linkText: {
//         marginTop: 20,
//         color: '#007bff',
//         textAlign: 'center',
//     },
//     errorText: {
//         color: 'red',
//         textAlign: 'center',
//         marginBottom: 10,
//     },
// });

// export default UserRegister;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const register = async () => {
        try {
            // Using your provided IPv4 address
            const response = await axios.post('http://172.20.64.1:5000/api/users/register', { // Replace with your IP address
                name, email, phone, address, city, pin, password,
            });
            const { token, userId } = response.data;

            await AsyncStorage.setItem('userId', userId);
            Alert.alert('Registration Successful', `Your User ID: ${userId}`);
            navigation.navigate('UserSignin');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Registration Failed');
            console.log('Error during registration:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.header}>User Register</Text>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="PIN Code"
                        value={pin}
                        onChangeText={setPin}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={register}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('UserSignin')}>
                        <Text style={styles.linkText}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkText: {
        marginTop: 20,
        color: '#007bff',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default UserRegister;
