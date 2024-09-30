 

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { fonts } from "../utils/fonts";  
import Header from './Header';

export default function ReferShare() {
    const navigation = useNavigation();
    const share = async () => {
        const options = {
            message: '',
            url: 'https://maras.com/',
            email: 'support@maras.com',
            subject: 'Maras- Your Solution',
            recipient: '+91 9999781282',
        };

        try {
            const res = await Share.open(options);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = () => {
        navigation.navigate("HOME");
    };

    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
            {/* Header Section */}
         <Header />
                    

            {/* Refer and Share Section */}
            <View style={styles.referContainer}>
                <Text style={styles.mainTitle}>Share With Friends</Text>
                <Text style={styles.subtitle}>
                    "Get 10% off on Every Product"
                </Text>
                <Text style={styles.subtitle}>Share Now"</Text>
                <Image style={styles.shareImage} source={require('../assets/shareimg.png')} />
                <View style={styles.shareButtonContainer}>
                    <TouchableOpacity style={styles.button} onPress={share}>
                        <Text style={styles.buttonText}>Refer & Earn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: '#007BFF', // Blue header
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
    titleText: {
        fontSize: 28,
        fontFamily: fonts.regular,
        color: "#FFFFFF", // White text for the header
        fontWeight: 'bold',
    },
    referContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // White background for the whole screen
        marginTop:50
    },
    mainTitle: {
        fontSize: 32,
        color: '#333333', // Darker color for the main title
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: '#666666', // Lighter color for the subtitle
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    shareImage: {
        width: 350,
        height: 250,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    shareButtonContainer: {
        marginHorizontal: 40,
    },
    button: {
        height: 60,
        width: 340,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#007BFF', // Green share button
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});












 