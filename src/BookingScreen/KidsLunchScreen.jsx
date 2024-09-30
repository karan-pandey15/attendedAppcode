// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome'; 

// import Header from '../components/Header';

// // Updated Lunch service data
// const lunchServices = [
//   {
//     id: '1',
//     type: 'Sabji and 4 Puri',
//     price: '₹99',
//     description: 'Delicious sabji served with 4 freshly made puris, perfect for kids during lunch hours.',
//     imageUrl: 'https://example.com/lunch1.jpg', // Replace with a suitable lunch-related image URL
//   },
//   {
//     id: '2',
//     type: 'Bhujiya Sabji and 2 Paratha',
//     price: '₹99',
//     description: 'Delicious sabji served with 2 freshly Paratha with Potato bhujiya sabji, perfect for kids during lunch hours.',
//     imageUrl: 'https://example.com/lunch1.jpg', // Replace with a suitable lunch-related image URL
//   },
//   // You can add more lunch options here if needed
// ];

// const KidsLunchScreen = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [slotModalVisible, setSlotModalVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

//   const [addressDetails, setAddressDetails] = useState({
//     schoolAddress: '',
//     schoolName: '',
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

//   const openModal = () => {
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
//       `School Name: ${addressDetails.schoolName}\nAddress: ${addressDetails.schoolAddress}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nYour lunch will arrive as scheduled!`,
//     );

//     closeSlotModal();
//   };

//   // Open Date Picker Modal
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   // Close Date Picker Modal
//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   // Handle Date Picked from Calendar
//   const handleConfirmDate = (date) => {
//     const dateString = date.toDateString().split(' ').slice(0, 3).join(' ');
//     setSelectedDate(dateString);
//     hideDatePicker();
//   };

//   // Open Time Picker Modal
//   const showTimePicker = () => {
//     setTimePickerVisibility(true);
//   };

//   // Close Time Picker Modal
//   const hideTimePicker = () => {
//     setTimePickerVisibility(false);
//   };

//   // Handle Time Picked
//   const handleConfirmTime = (time) => {
//     const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setSelectedTime(timeString);
//     hideTimePicker();
//   };

//   const renderService = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.type}</Text>
//         <Text style={styles.text}>{item.price}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={openModal}>
//           <Text style={styles.addButtonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.imageContainer}>
//         <Image 
//           source={{ uri: item.imageUrl }} 
//           style={styles.image} 
//         />
//       </View>
//     </View>
//   );

//   return (
//     <>
//       <Header />
//       <View style={styles.container}>
//         <FlatList
//           data={lunchServices}
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
//               placeholder="School Address or Home Address"
//               value={addressDetails.schoolAddress}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, schoolAddress: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="School Name"
//               value={addressDetails.schoolName}
//               onChangeText={(text) => setAddressDetails({ ...addressDetails, schoolName: text })}
//             />

//             <View style={styles.modalButtons}>
//               <Button title="Next" onPress={() => { closeModal(); openSlotModal(); }} />
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
//             <Text style={styles.modalTitle}>When should the lunch be delivered?</Text>

//             {/* Date Selection */}
//             <View style={styles.dateContainer}>
//               {availableDates.map((date, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.dateBox,
//                     selectedDate === date && styles.selectedDateBox,
//                   ]}
//                   onPress={() => setSelectedDate(date)}
//                 >
//                   <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
//                     {date}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <TouchableOpacity style={styles.calendarButton} onPress={showDatePicker}>
//               <Icon name="calendar" size={24} color="#fff" style={styles.calendarIcon} />
//             </TouchableOpacity>

//             {/* Time Slot Selection */}
//             <Text style={styles.subText}>Select delivery time</Text>
//             <TouchableOpacity style={styles.timeButton} onPress={showTimePicker}>
//               <Text style={styles.timeButtonText}>
//                 {selectedTime ? selectedTime : 'Pick Time'}
//               </Text>
//             </TouchableOpacity>

//             <View style={styles.modalButtons}>
//               <Button title="Book" onPress={onBook} />
//               <Button title="Cancel" onPress={closeSlotModal} color="red" />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Calendar Date Picker */}
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmDate}
//         onCancel={hideDatePicker}
//       />

//       {/* Time Picker Modal */}
//       <DateTimePickerModal
//         isVisible={isTimePickerVisible}
//         mode="time"
//         onConfirm={handleConfirmTime}
//         onCancel={hideTimePicker}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 15,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   text: {
//     fontSize: 15,
//     color: '#666',
//   },
//   description: {
//     fontSize: 14,
//     color: '#777',
//     marginVertical: 10,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   slotModalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '90%',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   dateBox: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   selectedDateBox: {
//     borderColor: '#4CAF50',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   selectedDateText: {
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   calendarButton: {
//     marginVertical: 10,
//     padding: 10,
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   calendarIcon: {
//     marginRight: 5,
//   },
//   subText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#555',
//   },
//   timeButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default KidsLunchScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import Header from '../components/Header';

// Screen dimensions for responsive design
const { width } = Dimensions.get('window');

// Lunch service data
const smallLunchServices = [
  {
    id: '1',
    type: 'Sabji and 4 Puri',
    price: '₹99',
    description: 'Delicious sabji served with 4 freshly made puris, perfect for kids during lunch hours.',
    imageUrl: 'https://example.com/lunch1.jpg', // Replace with a suitable image URL
  },
  {
    id: '2',
    type: 'Bhujiya Sabji and 2 Paratha',
    price: '₹99',
    description: 'Delicious sabji served with 2 freshly Paratha with Potato bhujiya sabji, perfect for kids during lunch hours.',
    imageUrl: 'https://example.com/lunch2.jpg', // Replace with a suitable image URL
  },
];

const bigLunchServices = [
  {
    id: '3',
    type: 'Full Meal: Sabji, Roti, Rice & Dal',
    price: '₹150',
    description: 'A wholesome meal with sabji, roti, rice, and dal to keep kids energized during the day.',
    imageUrl: 'https://example.com/lunch3.jpg', // Replace with a suitable image URL
  },
  {
    id: '4',
    type: 'Paneer Masala and 3 Rotis',
    price: '₹130',
    description: 'Flavorful paneer masala paired with 3 freshly made rotis.',
    imageUrl: 'https://example.com/lunch4.jpg', // Replace with a suitable image URL
  },
];

const KidsLunchScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [slotModalVisible, setSlotModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedLunchType, setSelectedLunchType] = useState(null); // Track lunch type selection
  const [addressDetails, setAddressDetails] = useState({
    schoolAddress: '',
    schoolName: '',
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

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openSlotModal = () => setSlotModalVisible(true);
  const closeSlotModal = () => setSlotModalVisible(false);

  const onBook = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time slot.');
      return;
    }

    Alert.alert(
      'Booking Confirmed',
      `School Name: ${addressDetails.schoolName}\nAddress: ${addressDetails.schoolAddress}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nYour lunch will arrive as scheduled!`,
    );

    closeSlotModal();
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    const dateString = date.toDateString().split(' ').slice(0, 3).join(' ');
    setSelectedDate(dateString);
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleConfirmTime = (time) => {
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedTime(timeString);
    hideTimePicker();
  };

  const renderService = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
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
        {/* Button for selecting Small Lunch or Big Lunch */}
        <View style={styles.lunchTypeContainer}>
          <TouchableOpacity
            style={[styles.lunchTypeButton, selectedLunchType === 'small' && styles.selectedLunchType]}
            onPress={() => setSelectedLunchType('small')}>
            <Text style={styles.lunchTypeText}>Small Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.lunchTypeButton, selectedLunchType === 'big' && styles.selectedLunchType]}
            onPress={() => setSelectedLunchType('big')}>
            <Text style={styles.lunchTypeText}>Big Lunch</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional rendering based on lunch type selection */}
        {selectedLunchType === 'small' && (
          <FlatList
            data={smallLunchServices}
            renderItem={renderService}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
        {selectedLunchType === 'big' && (
          <FlatList
            data={bigLunchServices}
            renderItem={renderService}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      {/* Modal for entering address details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Details</Text>
            <TextInput
              style={styles.input}
              placeholder="School Address or Home Address"
              value={addressDetails.schoolAddress}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, schoolAddress: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="School Name"
              value={addressDetails.schoolName}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, schoolName: text })}
            />
            <View style={styles.modalButtons}>
              <Button title="Next" onPress={() => { closeModal(); openSlotModal(); }} />
              <Button title="Cancel" onPress={closeModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for selecting date and time slots */}
      <Modal visible={slotModalVisible} animationType="slide" transparent={true} onRequestClose={closeSlotModal}>
        <View style={styles.modalContainer}>
          <View style={styles.slotModalContent}>
            <Text style={styles.modalTitle}>When should the lunch be delivered?</Text>
            <View style={styles.dateContainer}>
              {availableDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateBox, selectedDate === date && styles.selectedDateBox]}
                  onPress={() => setSelectedDate(date)}>
                  <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.calendarButton} onPress={showDatePicker}>
              <Icon name="calendar" size={24} color="#fff" style={styles.calendarIcon} />
            </TouchableOpacity>
            <Text style={styles.subText}>Select delivery time</Text>
            <TouchableOpacity style={styles.timeButton} onPress={showTimePicker}>
              <Text style={styles.timeButtonText}>{selectedTime ? selectedTime : 'Pick Time'}</Text>
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <Button title="Book" onPress={onBook} />
              <Button title="Cancel" onPress={closeSlotModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Calendar Date Picker */}
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} />
      {/* Time Picker Modal */}
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  lunchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  lunchTypeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: width * 0.4,
    alignItems: 'center',
  },
  selectedLunchType: {
    backgroundColor: '#4CAF50',
  },
  lunchTypeText: {
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 15,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotModalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  selectedDateBox: {
    borderColor: '#4CAF50',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  selectedDateText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  calendarButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 5,
  },
  subText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  timeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default KidsLunchScreen;
