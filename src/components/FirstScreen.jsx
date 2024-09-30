import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
    const navigation = useNavigation(); 
    const handleBack = () => {
        navigation.navigate("HOME");
      };
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: '#fff', flexGrow: 1 }}>
        <View style={styles.RegisterBox}> 
          <Text style={{fontSize:35,fontWeight:'bold',marginBottom:20,color:'#111'}} >StylishMen</Text>
          
          <Image source={require('../assets/girl22.png')} style={styles.welcomeImg} />
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.paragraph}>
            Create an account to use the Features
          </Text>
          <Text style={styles.paragraph}> of this App</Text>

          <TouchableOpacity onPress={handleBack} style={styles.button} >
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>

          <Text onPress={() => props.navigation.navigate('HOME')} style={{ fontSize: 20, color: 'red', marginTop: 30, fontWeight: 'bold',marginBottom:35 }}>
            Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  RegisterBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  welcomeImg: {
    height: 300,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  heading: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: 30,
    color: '#111',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
    color: '#111',
  },
  button: {
    height: 50,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#774F36',
    color: '#fff',
    borderRadius: 10,
  },
});

export default WelcomeScreen;
