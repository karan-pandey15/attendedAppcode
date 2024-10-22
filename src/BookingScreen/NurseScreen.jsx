// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../components/Header';

// const services = [
//   {
//     id: '1',
//     type: 'Wound Dressing',
//     price: '₹149',
//     time: '30 min',
//     description: 'Expert dressing service for cuts, wounds, or post-surgical dressings, ensuring proper care and hygiene.',
//     imageUrl: 'https://example.com/dressing.jpg',
//   },
//   {
//     id: '2',
//     type: 'Injection Service',
//     price: '₹249',
//     time: '15 min',
//     description: 'Professional injection administration at your home for prescribed medications or vaccinations.',
//     imageUrl: 'https://example.com/injection.jpg',
//   },
// ];

// const NurseScreen = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [urgent, setUrgent] = useState(false); // New urgent state
//   const [slotModalVisible, setSlotModalVisible] = useState(false);
//   const [loginModalVisible, setLoginModalVisible] = useState(false); // Modal for "Please login"
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);

//   const [addressDetails, setAddressDetails] = useState({
//     houseNumber: '',
//     landmark: '',
//     name: '',
//     pinCode: '',
//   });

//   const [availableDates, setAvailableDates] = useState([]);

//   useEffect(() => {
//     // Dynamically generate the next 3 days for the date selection
//     const generateDates = () => {
//       const today = new Date();
//       const dates = [];
//       for (let i = 0; i < 3; i++) {
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + i);
//         const dateString = nextDate.toDateString().split(' ').slice(0, 3).join(' '); // e.g., "Wed Sep 27"
//         dates.push(dateString);
//       }
//       setAvailableDates(dates);
//     };
//     generateDates();
//   }, []);

//   const checkAuthentication = async (isUrgent = false) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       // User is authenticated
//       openModal(isUrgent);
//     } else {
//       // User is not authenticated, show login modal and redirect after 1 second
//       setLoginModalVisible(true);
//       setTimeout(() => {
//         setLoginModalVisible(false);
//         navigation.navigate('UserSignin'); // Redirect to login screen
//       }, 1000);
//     }
//   };

//   const openModal = (isUrgent = false) => {
//     setUrgent(isUrgent); // Set urgent state based on click
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const openSlotModal = () => {
//     setSlotModalVisible(true);
//   };

//   const closeSlotModal = () => {
//     setSlotModalVisible(false);
//   };

//   const onBook = () => {
//     if (!selectedDate || !selectedTime) {
//       Alert.alert('Error', 'Please select a date and time slot.');
//       return;
//     }

//     // Show a confirmation message with user details
//     Alert.alert(
//       'Booking Confirmed',
//       `Name: ${addressDetails.name}\nHouse/Flat: ${addressDetails.houseNumber}\nPin: ${addressDetails.pinCode}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nOur nurse will arrive as scheduled!`,
//     );

//     closeSlotModal();
//   };

//   // Handle booking for urgent requests
//   const onUrgentBook = () => {
//     if (!addressDetails.houseNumber || !addressDetails.pinCode) {
//       Alert.alert('Error', 'Please enter complete address details.');
//       return;
//     }

//     Alert.alert(
//       'Urgent Booking Confirmed',
//       `Name: ${addressDetails.name}\nHouse/Flat: ${addressDetails.houseNumber}\nPin: ${addressDetails.pinCode}\n\nOur nurse will arrive shortly!`,
//     );
//     closeModal();
//   };

//   const renderService = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.type}</Text>
//         <Text style={styles.text}>{item.price}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//         <View style={styles.buttonsRow}>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => checkAuthentication(false)} // Check if logged in before opening modal
//           >
//             <Text style={styles.addButtonText}>Add</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.urgentButton}
//             onPress={() => checkAuthentication(true)} // Check if logged in before opening urgent modal
//           >
//             <Text style={styles.addButtonText}>Urgent</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//       </View>
//     </View>
//   );

//   return (
//     <>
//       <Header />
//       <View style={styles.container}>
//         <FlatList
//           data={services}
//           renderItem={renderService}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       </View>

//       {/* Modal for entering address details */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Enter Details</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="House/Flat Number"
//               value={addressDetails.houseNumber}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, houseNumber: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Complete Address"
//               value={addressDetails.landmark}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, landmark: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Pin Code"
//               keyboardType="numeric"
//               value={addressDetails.pinCode}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, pinCode: text })}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Description (Optional)"
//               value={addressDetails.name}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, name: text })}
//             />

//             <View style={styles.modalButtons}>
//               {urgent ? (
//                 <Button title="Confirm Urgent" onPress={onUrgentBook} />
//               ) : (
//                 <Button title="Next" onPress={() => { closeModal(); openSlotModal(); }} />
//               )}
//               <Button title="Cancel" onPress={closeModal} color="red" />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Modal for selecting date and time slots */}
//       <Modal
//         visible={slotModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeSlotModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.slotModalContent}>
//             <Text style={styles.modalTitle}>When should the nurse arrive?</Text>
//             <Text style={styles.subText}>Service duration will vary by type</Text>

//             {/* Date Selection */}
//             <View style={styles.dateContainer}>
//               {availableDates.map((date, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.dateBox, selectedDate === date && styles.selectedDateBox]}
//                   onPress={() => setSelectedDate(date)}
//                 >
//                   <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
//                     {date}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Time Slot Selection */}
//             <Text style={styles.subText}>Select start time of service</Text>
//             <ScrollView contentContainerStyle={styles.timeContainer}>
//               {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'].map((time, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.timeBox, selectedTime === time && styles.selectedTimeBox]}
//                   onPress={() => setSelectedTime(time)}
//                 >
//                   <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
//                     {time}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>

//             {/* Modal buttons */}
//             <View style={styles.modalButtons}>
//               <Button title="Book" onPress={onBook} />
//               <Button title="Cancel" onPress={closeSlotModal} color="red" />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Login reminder modal */}
//       <Modal
//         visible={loginModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setLoginModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.loginModalContent}>
//             <Text style={styles.modalTitle}>Please login to use service</Text>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };
  

// export default NurseScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const services = [
  {
    id: '1',
    type: 'Wound Dressing',
    price: '₹149',
    time: '30 min',
    description: 'Expert dressing service for cuts, wounds, or post-surgical dressings, ensuring proper care and hygiene.',
    imageUrl: 'https://example.com/dressing.jpg',
  },
  {
    id: '2',
    type: 'Injection Service',
    price: '₹249',
    time: '15 min',
    description: 'Professional injection administration at your home for prescribed medications or vaccinations.',
    imageUrl: 'https://example.com/injection.jpg',
  },
];

const NurseScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [slotModalVisible, setSlotModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [addressDetails, setAddressDetails] = useState({
    houseNumber: '',
    landmark: '',
    name: '',
    pinCode: '',
  });

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const dates = [];
      for (let i = 0; i < 3; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dateString = nextDate.toDateString().split(' ').slice(0, 3).join(' ');
        dates.push(dateString);
      }
      setAvailableDates(dates);
    };
    generateDates();
  }, []);

  const checkAuthentication = async (isUrgent = false) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      openModal(isUrgent);
    } else {
      setLoginModalVisible(true);
      setTimeout(() => {
        setLoginModalVisible(false);
        navigation.navigate('UserSignin');
      }, 1000);
    }
  };

  const openModal = (isUrgent = false) => {
    setUrgent(isUrgent);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openSlotModal = () => {
    setSlotModalVisible(true);
  };

  const closeSlotModal = () => {
    setSlotModalVisible(false);
  };

  const onBook = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time slot.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const userDetails = await AsyncStorage.getItem('userDetails'); // Assuming user details are stored here as a JSON string
    const user = JSON.parse(userDetails);

    // Prepare booking details
    const bookingDetails = {
      address: addressDetails.houseNumber + ', ' + addressDetails.landmark,
      pinCode: addressDetails.pinCode,
      serviceType: services[0].type, // Change this as needed for dynamic service type
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch('http://172.20.64.1:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      console.log('Booking confirmed:', data); // Log the confirmation in console
      Alert.alert('Booking Confirmed', `Your booking has been confirmed for ${selectedDate} at ${selectedTime}.`);
      closeSlotModal();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onUrgentBook = () => {
    if (!addressDetails.houseNumber || !addressDetails.pinCode) {
      Alert.alert('Error', 'Please enter complete address details.');
      return;
    }

    Alert.alert(
      'Urgent Booking Confirmed',
      `Name: ${addressDetails.name}\nHouse/Flat: ${addressDetails.houseNumber}\nPin: ${addressDetails.pinCode}\n\nOur nurse will arrive shortly!`,
    );
    closeModal();
  };

  const renderService = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => checkAuthentication(false)}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.urgentButton}
            onPress={() => checkAuthentication(true)}
          >
            <Text style={styles.addButtonText}>Urgent</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Modal for entering address details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Details</Text>
            <TextInput
              style={styles.input}
              placeholder="House/Flat Number"
              value={addressDetails.houseNumber}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, houseNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Complete Address"
              value={addressDetails.landmark}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, landmark: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Pin Code"
              keyboardType="numeric"
              value={addressDetails.pinCode}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, pinCode: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (Optional)"
              value={addressDetails.name}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, name: text })}
            />
            <View style={styles.modalButtons}>
              {urgent ? (
                <Button title="Confirm Urgent" onPress={onUrgentBook} />
              ) : (
                <Button title="Next" onPress={() => { closeModal(); openSlotModal(); }} />
              )}
              <Button title="Cancel" onPress={closeModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for selecting date and time slots */}
      <Modal
        visible={slotModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSlotModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.slotModalContent}>
            <Text style={styles.modalTitle}>When should the nurse arrive?</Text>
            <Text style={styles.subText}>Service duration will vary by type</Text>
            {/* Date Selection */}
            <View style={styles.dateContainer}>
              {availableDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateBox, selectedDate === date && styles.selectedDateBox]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Time Slot Selection */}
            <Text style={styles.subText}>Select start time of service</Text>
            <ScrollView contentContainerStyle={styles.timeContainer}>
              {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'].map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeBox, selectedTime === time && styles.selectedTimeBox]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Modal buttons */}
            <View style={styles.modalButtons}>
              <Button title="Book" onPress={onBook} />
              <Button title="Cancel" onPress={closeSlotModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Login reminder modal */}
      <Modal
        visible={loginModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.loginModalContent}>
            <Text style={styles.modalTitle}>Please login to use service</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NurseScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      marginBottom: 20,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 3,
      paddingRight: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    text: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    description: {
      fontSize: 13,
      color: '#888',
      marginBottom: 10,
      lineHeight: 18,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    addButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    urgentButton: {
      backgroundColor: '#ff5555',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      resizeMode: 'cover',
    },
  
    // Modal Styles
    loginModalContent:{
      backgroundColor:"#FFF",
      color:'black'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginVertical: 10,
      backgroundColor: '#f5f5f5',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  
    // Date and Time Slot Modal
    slotModalContent: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    subText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    dateBox: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#f5f5f5',
      width: '28%',
      alignItems: 'center',
    },
    selectedDateBox: {
      backgroundColor: '#28a745',
      borderColor: '#28a745',
    },
    dateText: {
      color: '#666',
      fontSize: 14,
    },
    selectedDateText: {
      color: '#fff',
    },
  
    timeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    timeBox: {
      width: '30%',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#f5f5f5',
      marginBottom: 10,
      alignItems: 'center',
    },
    selectedTimeBox: {
      backgroundColor: '#28a745',
      borderColor: '#28a745',
    },
    timeText: {
      color: '#666',
      fontSize: 14,
    },
    selectedTimeText: {
      color: '#fff',
    },
  
    // Button Styles
    button: {
      backgroundColor: '#28a745',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    cancelButton: {
      backgroundColor: '#ff5555',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
   
 