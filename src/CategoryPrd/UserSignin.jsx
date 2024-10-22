// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../components/Header';

// const UserSignin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigation = useNavigation();

 

//     return (
//         <>
//             <Header />
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.formContainer}>
//                     <Text style={styles.title}>User Login</Text>
//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Password"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                         style={styles.input}
//                     />
//                     <TouchableOpacity   style={styles.button}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                     <View style={styles.footer}>
//                         <Text style={styles.footerText}>Did not have an account? </Text>
//                         <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
//                             <Text style={styles.linkText}>Sign Up</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         </>
//     );
// };

// export default UserSignin;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     formContainer: {
//         width: '90%',
//         backgroundColor: '#ffffff',
//         padding: 25,
//         borderRadius: 15,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//         elevation: 6,
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 30,
//         color: '#333',
//     },
//     input: {
//         width: '100%',
//         height: 50,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         marginBottom: 20,
//         backgroundColor: '#f9f9f9',
//     },
//     button: {
//         backgroundColor: '#1E90FF',
//         paddingVertical: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 30,
//     },
//     footerText: {
//         color: '#555',
//         fontSize: 16,
//     },
//     linkText: {
//         color: '#1E90FF',
//         fontWeight: '600',
//         fontSize: 16,
//         marginLeft: 5,
//     },
// });



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const UserSignin = () => {
    const [emailOrUserId, setEmailOrUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const login = async () => {
        try {
            const response = await axios.post('http://172.20.64.1:5000/api/users/login', {
                emailOrUserId, password,
            });
            const { token, userId } = response.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', userId);

            Alert.alert('Login Successful', `Welcome, ${userId}`);
            navigation.navigate('ACCOUNT');
        } catch (error) {
            Alert.alert('Login Failed', error.response.data.message);
        }
    };

    return (
        <>
            <Header />
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>User Login</Text>
                    <TextInput
                        placeholder="Email or User ID"
                        value={emailOrUserId}
                        onChangeText={setEmailOrUserId}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Did not have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default UserSignin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        padding: 25,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#555',
        fontSize: 16,
    },
    linkText: {
        color: '#1E90FF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 5,
    },
});
