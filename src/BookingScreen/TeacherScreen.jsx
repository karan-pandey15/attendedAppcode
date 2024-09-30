 



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../components/Header';

// Mock data for teachers
const teachers = [
  {
    id: '1',
    name: 'Mr. Arjun Kumar',
    subject: 'Mathematics (Class 6 - 12)',
    price: '₹2,000 per month',
    description: 'Expert in Algebra, Geometry, and Trigonometry for middle and high school students.',
    imageUrl: 'https://example.com/teacher1.jpg',
  },
  {
    id: '2',
    name: 'Ms. Neha Sharma',
    subject: 'English (Class 1 - 12)',
    price: '₹1,800 per month',
    description: 'Experienced in teaching English grammar, literature, and essay writing for all grades.',
    imageUrl: 'https://example.com/teacher2.jpg',
  },
  {
    id: '3',
    name: 'Mr. Rahul Joshi',
    subject: 'Science (Class 5 - 10)',
    price: '₹1,500 per month',
    description: 'Focus on Physics, Chemistry, and Biology concepts for middle school students.',
    imageUrl: 'https://example.com/teacher3.jpg',
  },
  {
    id: '4',
    name: 'Ms. Kavita Singh',
    subject: 'History (Class 6 - 10)',
    price: '₹1,200 per month',
    description: 'In-depth teaching of ancient, medieval, and modern history.',
    imageUrl: 'https://example.com/teacher4.jpg',
  },
  {
    id: '5',
    name: 'Ms. Priya Gupta',
    subject: 'Geography (Class 5 - 10)',
    price: '₹1,400 per month',
    description: 'Specialized in teaching geographical concepts and map reading.',
    imageUrl: 'https://example.com/teacher5.jpg',
  },
  {
    id: '6',
    name: 'Mr. Vikash Tiwari',
    subject: 'Hindi (Class 1 - 12)',
    price: '₹1,600 per month',
    description: 'Specialist in Hindi grammar and literature for CBSE, ICSE, and UP Board.',
    imageUrl: 'https://example.com/teacher6.jpg',
  },
  {
    id: '7',
    name: 'Mr. Sameer Khan',
    subject: 'Computer Science (Class 9 - 12)',
    price: '₹2,200 per month',
    description: 'Expert in programming, algorithms, and computer networks.',
    imageUrl: 'https://example.com/teacher7.jpg',
  },
  {
    id: '8',
    name: 'Ms. Nidhi Singh',
    subject: 'Economics (Class 11 - 12)',
    price: '₹2,500 per month',
    description: 'Experienced in micro and macroeconomics for higher secondary students.',
    imageUrl: 'https://example.com/teacher8.jpg',
  },
  {
    id: '9',
    name: 'Mr. Alok Verma',
    subject: 'Chemistry (Class 9 - 12)',
    price: '₹2,300 per month',
    description: 'Focuses on organic, inorganic, and physical chemistry.',
    imageUrl: 'https://example.com/teacher9.jpg',
  },
  {
    id: '10',
    name: 'Ms. Sunita Yadav',
    subject: 'Biology (Class 9 - 12)',
    price: '₹2,000 per month',
    description: 'Expert in botany, zoology, and human anatomy.',
    imageUrl: 'https://example.com/teacher10.jpg',
  },
];

const TeacherScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [slotModalVisible, setSlotModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [addressDetails, setAddressDetails] = useState({
    houseNumber: '',
    landmark: '',
    name: '',
    gender: '',
    location: '',
  });

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Dynamically generate dates for the entire month
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
      `Name: ${addressDetails.name}\nGender: ${addressDetails.gender}\nLocation: ${addressDetails.location}\nHouse/Flat: ${addressDetails.houseNumber}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nYour selected teacher will arrive as scheduled!`
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

  // Filter teachers based on the subject entered in the search bar
  useEffect(() => {
    const filteredData = teachers.filter(teacher =>
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeachers(filteredData);
  }, [searchQuery]);

  const renderTeacher = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.subject}</Text>
        <Text style={styles.text}>{item.price}</Text>
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
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search teacher by subject..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredTeachers}
          renderItem={renderTeacher}
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
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={addressDetails.gender}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, gender: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={addressDetails.location}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, location: text })}
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
            <Text style={styles.modalTitle}>When should the teacher arrive?</Text>
            <Text style={styles.subText}>Your class will take approx. 1 hr</Text>

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
            <Text style={styles.subText}>Select start time of class</Text>
            <ScrollView contentContainerStyle={styles.timeContainer}>
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>
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

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  slotModalContent: {
    width: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedDateBox: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  dateText: {
    fontSize: 14,
  },
  selectedDateText: {
    color: '#fff',
  },
  calendarButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  timeSlotText: {
    fontSize: 14,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
});

export default TeacherScreen;
