import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, Button, Platform, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EventCrewsScreen = () => {
  const [selectedGender, setSelectedGender] = useState(''); // Gender selection
  const [eventType, setEventType] = useState(''); // Corporate or Brand Promotion
  const [locationType, setLocationType] = useState(''); // Local or Out of Station
  const [ageRange, setAgeRange] = useState(''); // Age range selection

  const [bottomModalVisible, setBottomModalVisible] = useState(false); // Modal visibility for filters
  const [dateModalVisible, setDateModalVisible] = useState(false); // Modal visibility for date picker

  const [selectedDate, setSelectedDate] = useState(null); // Date selection
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker visibility

  const showBottomModal = () => setBottomModalVisible(true);
  const closeBottomModal = () => setBottomModalVisible(false);
  const showDateModal = () => setDateModalVisible(true);
  const closeDateModal = () => setDateModalVisible(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onRequestCrews = () => {
    if (!selectedGender || !eventType || !locationType || !ageRange) {
      Alert.alert('Error', 'Please select all the options');
    } else {
      // Proceed to next step: show date and time picker modal
      closeBottomModal();
      showDateModal();
    }
  };

  const onBookCrew = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date and time');
    } else {
      Alert.alert(
        'Success',
        `Crew booked: ${selectedGender}, ${eventType}, ${locationType}, Age: ${ageRange}, Date: ${selectedDate}`
      );
      closeDateModal();
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.bookingContainer}>
          <Text style={styles.heading}>Event Crew Request</Text>
          <Text style={styles.noBookingText}>No crew requested yet.</Text>

          <TouchableOpacity style={styles.submitButton} onPress={showBottomModal}>
            <Text style={styles.submitButtonText}>Request Event Crew</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom modal for selecting filters */}
      <Modal
        visible={bottomModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeBottomModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomModalContent}>
            <ScrollView>
              {/* Gender Selection */}
              <Text style={styles.modalTitle}>Select Gender</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Any'].map((gender, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, selectedGender === gender && styles.selectedOptionButton]}
                    onPress={() => setSelectedGender(gender)}
                  >
                    <Text style={[styles.optionText, selectedGender === gender && styles.selectedOptionText]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Event Type Selection */}
              <Text style={styles.modalTitle}>Event Type</Text>
              <View style={styles.optionContainer}>
                {['Corporate', 'Brand Promotion'].map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, eventType === type && styles.selectedOptionButton]}
                    onPress={() => setEventType(type)}
                  >
                    <Text style={[styles.optionText, eventType === type && styles.selectedOptionText]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Location Type Selection */}
              <Text style={styles.modalTitle}>Location Type</Text>
              <View style={styles.optionContainer}>
                {['Local', 'Out of Station'].map((location, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, locationType === location && styles.selectedOptionButton]}
                    onPress={() => setLocationType(location)}
                  >
                    <Text style={[styles.optionText, locationType === location && styles.selectedOptionText]}>
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Age Range Selection */}
              <Text style={styles.modalTitle}>Age Range</Text>
              <View style={styles.optionContainer}>
                {['20-30', '30-40', '40-50'].map((age, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, ageRange === age && styles.selectedOptionButton]}
                    onPress={() => setAgeRange(age)}
                  >
                    <Text style={[styles.optionText, ageRange === age && styles.selectedOptionText]}>
                      {age}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <Button title="Next" onPress={onRequestCrews} />
                <Button title="Cancel" onPress={closeBottomModal} color="red" />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Date and Time picker modal */}
      <Modal
        visible={dateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomModalContent}>
            <Text style={styles.modalTitle}>Select Date and Time</Text>
            <TouchableOpacity style={styles.submitButton} onPress={showDatePicker}>
              <Text style={styles.submitButtonText}>
                {selectedDate ? selectedDate.toLocaleString() : 'Pick a Date & Time'}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <View style={styles.modalButtons}>
              <Button title="Book Crew" onPress={onBookCrew} />
              <Button title="Cancel" onPress={closeDateModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedOptionButton: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default EventCrewsScreen;
