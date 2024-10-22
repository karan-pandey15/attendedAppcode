import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';

const SolarEnquiryScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    usage: '',
    systemSize: '',
    message: '',
  });

  const usageOptions = [
    { label: 'Commercial', value: 'commercial' },
    { label: 'Residential', value: 'residential' },
  ];

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUsageSelect = () => {
    const options = usageOptions.map(option => option.label).join('\n');
    Alert.alert('Select Use', options, [
      ...usageOptions.map(option => ({
        text: option.label,
        onPress: () => handleInputChange('usage', option.value),
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    Alert.alert('Database not connected', 'Please try again later.');
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Installation Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your installation address"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your state"
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pin Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your pin code"
              value={formData.pinCode}
              onChangeText={(value) => handleInputChange('pinCode', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Use</Text>
            <TouchableOpacity onPress={handleUsageSelect}>
              <TextInput
                style={styles.input}
                placeholder="Select use (Commercial or Residential)"
                value={formData.usage}
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estimated System Size (kW)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter estimated system size"
              value={formData.systemSize}
              onChangeText={(value) => handleInputChange('systemSize', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Information</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Any additional information or questions?"
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SolarEnquiryScreen;
