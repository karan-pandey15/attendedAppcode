import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Header from '../components/Header';

const AttendedRegister = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    category: '',
    availability: '',
    qualification: '',
    address: '',
    panNumber: '',
    aadharNumber: '',
    gender: '',
    religion: '',
    city: '',
    state: '',
    pinCode: '',
    maritalStatus: '',
    wifeName: '',
    wifeAadharNumber: '',
    wifePanNumber: '',
    jobStatus: '',
    bankName: '',
    accountNumber: '',
    branch: '',
    ifscCode: '',
    paymentReceiver: '',
    relationBankName: '',
    relationAccountNumber: '',
    relationBranch: '',
    relationIfscCode: '',
    marksheet: null,
    image: null,
    checkBook: null,
    customRequirements: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission
    Alert.alert('Registration Successful', 'Your registration was successful.');
    navigation.navigate('AttendedSignin'); // Assuming you have a screen named 'AttendedSignin'
  };

  const renderGuardianOptions = () => {
    switch (formData.category) {
      case 'Guardian for Children':
        return (
          <View style={styles.section}>
            <Text style={styles.label}>Select Activities:</Text>
            {['Dropping School, Tuition', 'Go for Shopping, Market', 'Travelling With Kids', 'Other Activity'].map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TextInput
                  style={styles.checkbox}
                  // Checkbox logic is more complex in React Native
                />
                <Text style={styles.optionLabel}>{option}</Text>
              </View>
            ))}
          </View>
        );
      case 'Guardian for Self':
        return (
          <View style={styles.section}>
            <Text style={styles.label}>Select Services:</Text>
            {['For hospital Visit', 'For Shopping', 'For bank passbook Updation'].map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TextInput
                  style={styles.checkbox}
                  // Checkbox logic is more complex in React Native
                />
                <Text style={styles.optionLabel}>{option}</Text>
              </View>
            ))}
          </View>
        );
      case 'Others':
        return (
          <View style={styles.section}>
            <Text style={styles.label}>What Work You Can Do:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your requirements"
              value={formData.customRequirements}
              onChangeText={text => handleChange('customRequirements', text)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
<View>
    <Header />
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Register</Text> */}
      <View style={styles.formGroup}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Create Your Password"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={formData.phone}
          onChangeText={text => handleChange('phone', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Language"
          value={formData.language}
          onChangeText={text => handleChange('language', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Category"
          value={formData.category}
          onChangeText={text => handleChange('category', text)}
        />
        {renderGuardianOptions()}
        {formData.category === 'Attendant For your Parents' && (
          <TextInput
            style={styles.textInput}
            placeholder="Availability"
            value={formData.availability}
            onChangeText={text => handleChange('availability', text)}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Qualification"
          value={formData.qualification}
          onChangeText={text => handleChange('qualification', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          value={formData.address}
          onChangeText={text => handleChange('address', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="PAN Number"
          value={formData.panNumber}
          onChangeText={text => handleChange('panNumber', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Aadhar Number"
          value={formData.aadharNumber}
          onChangeText={text => handleChange('aadharNumber', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Gender"
          value={formData.gender}
          onChangeText={text => handleChange('gender', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Religion"
          value={formData.religion}
          onChangeText={text => handleChange('religion', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="City"
          value={formData.city}
          onChangeText={text => handleChange('city', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="State"
          value={formData.state}
          onChangeText={text => handleChange('state', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Pin Code"
          value={formData.pinCode}
          onChangeText={text => handleChange('pinCode', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Marital Status"
          value={formData.maritalStatus}
          onChangeText={text => handleChange('maritalStatus', text)}
        />
        {formData.maritalStatus === 'yes' && (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Wife's Name"
              value={formData.wifeName}
              onChangeText={text => handleChange('wifeName', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Wife's Aadhar Number"
              value={formData.wifeAadharNumber}
              onChangeText={text => handleChange('wifeAadharNumber', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Wife's PAN Number"
              value={formData.wifePanNumber}
              onChangeText={text => handleChange('wifePanNumber', text)}
            />
          </View>
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Job Status"
          value={formData.jobStatus}
          onChangeText={text => handleChange('jobStatus', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Bank Name"
          value={formData.bankName}
          onChangeText={text => handleChange('bankName', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Account Number"
          value={formData.accountNumber}
          onChangeText={text => handleChange('accountNumber', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Branch"
          value={formData.branch}
          onChangeText={text => handleChange('branch', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChangeText={text => handleChange('ifscCode', text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Payment Receiver"
          value={formData.paymentReceiver}
          onChangeText={text => handleChange('paymentReceiver', text)}
        />
        {formData.paymentReceiver === 'relation' && (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Relation Bank Name"
              value={formData.relationBankName}
              onChangeText={text => handleChange('relationBankName', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Relation Account Number"
              value={formData.relationAccountNumber}
              onChangeText={text => handleChange('relationAccountNumber', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Relation Branch"
              value={formData.relationBranch}
              onChangeText={text => handleChange('relationBranch', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Relation IFSC Code"
              value={formData.relationIfscCode}
              onChangeText={text => handleChange('relationIfscCode', text)}
            />
          </View>
        )}
        <Text style={styles.label}>Upload Documents</Text>
        <TouchableOpacity
          style={styles.button}
          // onPress={handlePickImage} // Uncomment if using image picker
        >
          <Text style={styles.buttonText}>Upload Marksheet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // onPress={handlePickImage} // Uncomment if using image picker
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // onPress={handlePickImage} // Uncomment if using image picker
        >
          <Text style={styles.buttonText}>Upload Check Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    width: '90%',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default AttendedRegister;
