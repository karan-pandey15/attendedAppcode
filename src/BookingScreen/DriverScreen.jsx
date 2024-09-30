// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, Button, Platform, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Install this package

// const DriverScreen = () => {
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [dropLocation, setDropLocation] = useState('');
//   const [slotModalVisible, setSlotModalVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [availableDates, setAvailableDates] = useState(['Sep 30', 'Oct 1', 'Oct 2']); // Add your available dates
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const requestRide = () => {
//     // Show an alert saying "Database not connected"
//     Alert.alert("Error", "Database not connected");
//   };

//   const showSlotModal = () => setSlotModalVisible(true);
//   const closeSlotModal = () => setSlotModalVisible(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     const formattedDate = date.toLocaleDateString();
//     setSelectedDate(formattedDate);
//     hideDatePicker();
//   };

//   const onBook = () => {
//     if (!pickupLocation || !dropLocation || !selectedDate || !selectedTime) {
//       Alert.alert('Error', 'Please fill all the details');
//     } else {
//       Alert.alert('Success', `Ride booked for ${selectedDate} at ${selectedTime}`);
//       closeSlotModal();
//     }
//   };

//   return (
//     <>
//       <Header />
//       <View style={styles.container}>
//         <View style={styles.bookingContainer}>
//           <Text style={styles.heading}>My Booking</Text>
//           <Text style={styles.noBookingText}>No booking details available.</Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Pickup Location"
//               value={pickupLocation}
//               onChangeText={setPickupLocation}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Drop Location"
//               value={dropLocation}
//               onChangeText={setDropLocation}
//             />
//             <TouchableOpacity style={styles.submitButton} onPress={requestRide}>
//               <Text style={styles.submitButtonText}>Book Ride For Now</Text>
//             </TouchableOpacity>

//             {/* Button to open modal */}
//             <TouchableOpacity style={styles.submitButton} onPress={showSlotModal}>
//               <Text style={styles.submitButtonText}>Book Ride for Later</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Modal for selecting date and time slots */}
//       <Modal
//         visible={slotModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeSlotModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.slotModalContent}>
//             <Text style={styles.modalTitle}>When should the professional arrive?</Text>
//             <Text style={styles.subText}>Your service will take approx. 1 hr</Text>

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
//               <Text style={styles.calendarButtonText}>Pick Date from Calendar</Text>
//             </TouchableOpacity>

//             {/* Time Slot Selection */}
//             <Text style={styles.subText}>Select start time of service</Text>
//             <ScrollView contentContainerStyle={styles.timeContainer}>
//               {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((time, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.timeBox,
//                     selectedTime === time && styles.selectedTimeBox,
//                   ]}
//                   onPress={() => setSelectedTime(time)}
//                 >
//                   <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
//                     {time}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>

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
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//         isDarkModeEnabled={Platform.OS === 'android' ? false : null} // Example for iOS dark mode
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bookingContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   noBookingText: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10, // Margin for spacing between buttons
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)', // Transparent black background
//   },
//   slotModalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subText: {
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   dateBox: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   selectedDateBox: {
//     backgroundColor: '#007BFF',
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   selectedDateText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   timeBox: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   selectedTimeBox: {
//     backgroundColor: '#007BFF',
//   },
//   timeText: {
//     fontSize: 14,
//   },
//   selectedTimeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   calendarButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   calendarButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DriverScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, Button, Platform, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Install this package

const DriverScreen = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates, setAvailableDates] = useState(['Sep 30', 'Oct 1', 'Oct 2']); // Add your available dates

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [slotModalVisible, setSlotModalVisible] = useState(false);

  const [rideType, setRideType] = useState(''); // For "Local" or "Out of Station"
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const showBottomModal = () => setBottomModalVisible(true);
  const closeBottomModal = () => setBottomModalVisible(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString();
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showLocationModal = () => {
    setLocationModalVisible(true);
    closeBottomModal(); // Close ride type modal
  };

  const closeLocationModal = () => setLocationModalVisible(false);

  const onNext = () => {
    if (!pickupLocation || !dropLocation) {
      Alert.alert('Error', 'Please enter pickup and drop location');
    } else {
      setLocationModalVisible(false);
      setSlotModalVisible(true); // Open time slot modal
    }
  };

  const onBook = () => {
    if (!pickupLocation || !dropLocation || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please fill all the details');
    } else {
      Alert.alert('Success', `Ride booked for ${selectedDate} at ${selectedTime}`);
      setSlotModalVisible(false);
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.bookingContainer}>
          <Text style={styles.heading}>My Booking</Text>
          <Text style={styles.noBookingText}>No booking details available.</Text>

          <TouchableOpacity style={styles.submitButton} onPress={showBottomModal}>
            <Text style={styles.submitButtonText}>Book Ride for Later</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom modal for ride type selection */}
      <Modal
        visible={bottomModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeBottomModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomModalContent}>
            <Text style={styles.modalTitle}>Select Ride Type</Text>

            <TouchableOpacity
              style={styles.rideOptionButton}
              onPress={() => {
                setRideType('Local');
                showLocationModal(); // Show location modal after selection
              }}
            >
              <Text style={styles.rideOptionText}>Local</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rideOptionButton}
              onPress={() => {
                setRideType('Out of Station');
                showLocationModal(); // Show location modal after selection
              }}
            >
              <Text style={styles.rideOptionText}>Out of Station</Text>
            </TouchableOpacity>

            <Button title="Cancel" onPress={closeBottomModal} color="red" />
          </View>
        </View>
      </Modal>

      {/* Modal for entering Pickup and Drop Locations */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.locationModalContent}>
            <Text style={styles.modalTitle}>Enter Location Details ({rideType})</Text>

            <TextInput
              style={styles.input}
              placeholder="Pickup Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Drop Location"
              value={dropLocation}
              onChangeText={setDropLocation}
            />
            
            <Button title="Next" onPress={onNext} />
            <Button title="Cancel" onPress={closeLocationModal} color="red" />
          </View>
        </View>
      </Modal>

      {/* Modal for selecting date and time slots */}
      <Modal
        visible={slotModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSlotModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.slotModalContent}>
            <Text style={styles.modalTitle}>Select Date & Time</Text>

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
            <TouchableOpacity style={styles.calendarButton} onPress={showDatePicker}>
              <Text style={styles.calendarButtonText}>Pick Date from Calendar</Text>
            </TouchableOpacity>

            <Text style={styles.subText}>Select Time Slot</Text>
            <ScrollView contentContainerStyle={styles.timeContainer}>
              {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'].map((time, index) => (
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

            <View style={styles.modalButtons}>
              <Button title="Book" onPress={onBook} />
              <Button title="Cancel" onPress={() => setSlotModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Calendar Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  noBookingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    position: 'absolute',
    bottom: 0,
  },
  locationModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  rideOptionButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  rideOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedDateBox: {
    backgroundColor: '#007BFF',
  },
  dateText: {
    fontSize: 14,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  timeBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedTimeBox: {
    backgroundColor: '#007BFF',
  },
  timeText: {
    fontSize: 14,
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  calendarButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverScreen;
