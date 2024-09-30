import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import Header from '../components/Header';

const services = [
  {
    id: '1',
    type: 'Personal Training Session (1-on-1)',
    price: '₹999',
    time: '1 hr',
    description: 'One-on-one training session tailored to your fitness goals, including strength training and cardio.',
    imageUrl: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    type: 'Group Fitness Class',
    price: '₹600 (Per Person)',
    time: '1 hr',
    description: 'Join a fun and energetic group class led by a certified trainer focusing on various workout styles.',
    imageUrl: 'https://example.com/image2.jpg',
  },
  {
    id: '3',
    type: 'Nutrition Coaching',
    price: '₹1,500',
    time: '1 hr',
    description: 'Personalized nutrition plan and coaching session to help you achieve your health and fitness goals.',
    imageUrl: 'https://example.com/image3.jpg',
  },
];

const TrainerScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [slotModalVisible, setSlotModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [addressDetails, setAddressDetails] = useState({
    houseNumber: '',
    landmark: '',
    name: '',
  });

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Dynamically generate the next 3 days for the date selection
    const generateDates = () => {
      const today = new Date();
      const dates = [];
      for (let i = 0; i < 3; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dateString = nextDate.toDateString().split(' ').slice(0, 3).join(' '); // e.g., "Wed Sep 27"
        dates.push(dateString);
      }
      setAvailableDates(dates);
    };
    generateDates();
  }, []);

  const openModal = () => {
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

  const onBook = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time slot.');
      return;
    }

    // Show a confirmation message with user details
    Alert.alert(
      'Booking Confirmed',
      `Name: ${addressDetails.name}\nHouse/Flat: ${addressDetails.houseNumber}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nOur partner will arrive as scheduled!`,
    );

    closeSlotModal();
  };

  // Open Date Picker Modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Close Date Picker Modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle Date Picked from Calendar
  const handleConfirm = (date) => {
    const dateString = date.toDateString().split(' ').slice(0, 3).join(' ');
    setSelectedDate(dateString);
    hideDatePicker();
  };

  const renderService = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.text}>{item.price} • {item.time}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={openModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image} 
        />
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
              placeholder="Landmark (Optional)"
              value={addressDetails.landmark}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, landmark: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={addressDetails.name}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, name: text })}
            />

            <View style={styles.modalButtons}>
              <Button title="Next" onPress={() => { closeModal(); openSlotModal(); }} />
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
            <Text style={styles.modalTitle}>When should the professional arrive?</Text>
            <Text style={styles.subText}>Your service will take approx. 1 hr</Text>

            {/* Date Selection */}
            <View style={styles.dateContainer}>
              {availableDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateBox,
                    selectedDate === date && styles.selectedDateBox,
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.calendarButton} onPress={showDatePicker}>
  <Icon name="calendar" size={24} color="#fff" style={styles.calendarIcon} />
</TouchableOpacity>


            {/* Time Slot Selection */}
            <Text style={styles.subText}>Select start time of service</Text>
            <ScrollView contentContainerStyle={styles.timeContainer}>
              {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeBox,
                    selectedTime === time && styles.selectedTimeBox,
                  ]}
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
              <Button title="Cancel" onPress={closeSlotModal} color="red" />
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
        // Add Platform-specific adjustments if needed
        isDarkModeEnabled={Platform.OS === 'android' ? false : null}  // Example for iOS dark mode
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
    color: '#999',
    marginTop: 5,
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subText: {
    fontSize: 15,
    color: '#666',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedDateBox: {
    backgroundColor: '#007BFF',
  },
  dateText: {
    color: '#333',
  },
  selectedDateText: {
    color: 'white',
  },
  timeContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedTimeBox: {
    backgroundColor: '#007BFF',
  },
  timeText: {
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
  },
  calenderContainer:{
    marginTop:20
  },
  calendarButton: {
    backgroundColor: '#007BFF', // Button background color
    paddingVertical: 15,        // Padding for top and bottom
    paddingHorizontal: 20,      // Padding for left and right
    borderRadius: 10,           // Rounded corners
    marginTop: 10,              // Space from the element above
    alignSelf: 'center',        // Center the button horizontally
    elevation: 3,               // Shadow effect for Android
    shadowColor: '#000',        // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset shadow
    shadowOpacity: 0.2,         // Shadow opacity
    shadowRadius: 3,            // Shadow blur
  },
  
  calendarButtonText: {
    color: '#fff',              // Text color to white
    fontWeight: 'bold',         // Bold font for text
    fontSize: 16,               // Font size
    textAlign: 'center',        // Center text horizontally
  },
});

export default TrainerScreen;
