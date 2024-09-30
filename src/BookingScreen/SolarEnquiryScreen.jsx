// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
// import Header from '../components/Header';

// const solarInquiryFields = [
//   {
//     id: 'name',
//     label: 'Full Name',
//     placeholder: 'Enter your full name',
//     required: true,
//     type: 'text',
//   },
//   {
//     id: 'email',
//     label: 'Email Address',
//     placeholder: 'Enter your email address',
//     required: true,
//     type: 'email',
//   },
//   {
//     id: 'phone',
//     label: 'Phone Number',
//     placeholder: 'Enter your phone number',
//     required: true,
//     type: 'tel',
//   },
//   {
//     id: 'address',
//     label: 'Installation Address',
//     placeholder: 'Enter your installation address',
//     required: true,
//     type: 'text',
//   },
//   {
//     id: 'city',
//     label: 'City',
//     placeholder: 'Enter your city',
//     required: true,
//     type: 'text',
//   },
//   {
//     id: 'state',
//     label: 'State',
//     placeholder: 'Enter your state',
//     required: true,
//     type: 'text',
//   },
//   {
//     id: 'pinCode',
//     label: 'Pin Code',
//     placeholder: 'Enter your pin code',
//     required: true,
//     type: 'text',
//   },
//   {
//     id: 'usage',
//     label: 'Select Use',
//     placeholder: 'Select use (Commercial or Residential)',
//     required: true,
//     type: 'select',
//   },
//   {
//     id: 'systemSize',
//     label: 'Estimated System Size (kW)',
//     placeholder: 'Enter estimated system size',
//     required: false,
//     type: 'number',
//   },
//   {
//     id: 'message',
//     label: 'Additional Information',
//     placeholder: 'Any additional information or questions?',
//     required: false,
//     type: 'textarea',
//   },
// ];

// const solarTypeOptions = [
//   { value: 'gridTied', label: 'Grid-Tied' },
//   { value: 'offGrid', label: 'Off-Grid' },
//   { value: 'hybrid', label: 'Hybrid' },
// ];

// const usageOptions = [
//   { value: 'commercial', label: 'For Commercial' },
//   { value: 'residential', label: 'Residential' },
// ];

// const SolarEnquiryScreen = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pinCode: '',
//     usage: '',
//     systemSize: '',
//     message: '',
//   });

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleUsageSelect = () => {
//     const options = usageOptions.map(option => option.label).join('\n');
//     Alert.alert('Select Use', options, [
//       ...usageOptions.map(option => ({
//         text: option.label,
//         onPress: () => handleInputChange('usage', option.value),
//       })),
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleSubmit = () => {
//     Alert.alert('Database not connected', 'Please try again later.');
//   };

//   return (
//     <>
//       <Header />
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//           {/* First four input fields */}
//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Full Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Email Address</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//               />
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Phone Number</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChangeText={(value) => handleInputChange('phone', value)}
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Installation Address</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your installation address"
//                 value={formData.address}
//                 onChangeText={(value) => handleInputChange('address', value)}
//               />
//             </View>
//           </View>

//           {/* Display two inputs in a row after the fourth field */}
//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>City</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your city"
//                 value={formData.city}
//                 onChangeText={(value) => handleInputChange('city', value)}
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>State</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your state"
//                 value={formData.state}
//                 onChangeText={(value) => handleInputChange('state', value)}
//               />
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Pin Code</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your pin code"
//                 value={formData.pinCode}
//                 onChangeText={(value) => handleInputChange('pinCode', value)}
//               />
//             </View>
//             <View style={styles.inputContainerHalf}>
//               <Text style={styles.label}>Select Use</Text>
//               <TouchableOpacity onPress={handleUsageSelect}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Select use (Commercial or Residential)"
//                   value={formData.usage}
//                   editable={false}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Remaining fields */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Estimated System Size (kW)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter estimated system size"
//               value={formData.systemSize}
//               onChangeText={(value) => handleInputChange('systemSize', value)}
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Additional Information</Text>
//             <TextInput
//               style={[styles.input, styles.textarea]}
//               placeholder="Any additional information or questions?"
//               value={formData.message}
//               onChangeText={(value) => handleInputChange('message', value)}
//               multiline={true}
//             />
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   inputContainerHalf: {
//     width: '48%',
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 8,
//     fontWeight: '600',
//     fontSize: 16,
//     color: '#333',
//   },
//   input: {
//     height: 50,
//     borderColor: '#007BFF',
//     borderWidth: 2,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     backgroundColor: '#FFFFFF',
//   },
//   textarea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default SolarEnquiryScreen;


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
          {/* First four input fields */}
          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Installation Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your installation address"
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
              />
            </View>
          </View>

          {/* City and State/PinCode Fields in rows */}
          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city"
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
              />
            </View>
          </View>

          {/* State and Pin Code in one row */}
          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your state"
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
              />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Pin Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your pin code"
                value={formData.pinCode}
                onChangeText={(value) => handleInputChange('pinCode', value)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
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
          </View>

          {/* Estimated System Size and Additional Information */}
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

          {/* Submit Button */}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainerHalf: {
    width: '48%', // Adjust to make sure both fields fit in a row nicely
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
