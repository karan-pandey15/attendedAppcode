import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
];

const TeacherScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [genderFilter, setGenderFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [classTypeFilter, setClassTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(true); // State to show/hide filters

  const subjects = [
    'Mathematics', 'English', 'Science', 'History', 'Geography', 'Hindi', 
    'Computer Science', 'Economics', 'Chemistry', 'Biology'
  ];
  
  const classes = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const applyFilters = () => {
    let filteredData = teachers;

    // Apply gender filter
    if (genderFilter) {
      filteredData = filteredData.filter(teacher => {
        if (genderFilter === 'Male') {
          return teacher.name.startsWith('Mr.');
        } else if (genderFilter === 'Female') {
          return teacher.name.startsWith('Ms.') || teacher.name.startsWith('Mrs.');
        }
        return true;
      });
    }

    // Apply subject filter
    if (subjectFilter) {
      filteredData = filteredData.filter(teacher =>
        teacher.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    // Apply class filter
    if (classTypeFilter) {
      filteredData = filteredData.filter(teacher =>
        teacher.subject.toLowerCase().includes(`class ${classTypeFilter}`)
      );
    }

    setFilteredTeachers(filteredData);
    setShowFilters(false); // Hide filters after applying
  };

  const renderTeacher = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.subject}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
      </View>
    </View>
  );

  const clearFilters = () => {
    setGenderFilter('');
    setSubjectFilter('');
    setClassTypeFilter('');
    setShowFilters(true); // Show filters again
    setFilteredTeachers(teachers); // Reset to original data
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {/* Filter Section */}
        <Text style={styles.filterTitle}>Filter Teachers</Text>

        {/* Toggle Filters Visibility */}
        {showFilters && (
          <View>
            {/* Gender Filter */}
            <Text style={styles.filterLabel}>Select Gender:</Text>
            <View style={styles.filterRow}>
              <TouchableOpacity
                style={[styles.filterButton, genderFilter === 'Male' && styles.selectedFilter]}
                onPress={() => setGenderFilter('Male')}
              >
                <Text style={styles.filterButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, genderFilter === 'Female' && styles.selectedFilter]}
                onPress={() => setGenderFilter('Female')}
              >
                <Text style={styles.filterButtonText}>Female</Text>
              </TouchableOpacity>
            </View>

            {/* Subject Filter */}
            <Text style={styles.filterLabel}>Select Subject:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
              {subjects.map((subject, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.filterButton, subjectFilter === subject && styles.selectedFilter]}
                  onPress={() => setSubjectFilter(subject)}
                >
                  <Text style={styles.filterButtonText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Class Type Filter */}
            <Text style={styles.filterLabel}>Select Class Type:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
              {classes.map((classType, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.filterButton, classTypeFilter === classType && styles.selectedFilter]}
                  onPress={() => setClassTypeFilter(classType)}
                >
                  <Text style={styles.filterButtonText}>Class {classType}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Display Selected Filters */}
        {!showFilters && (
          <View style={styles.selectedFiltersContainer}>
            {genderFilter && (
              <View style={styles.selectedFilterTag}>
                <Text style={styles.selectedFilterText}>{genderFilter}</Text>
                <TouchableOpacity onPress={() => setGenderFilter('')}><Text style={styles.removeFilterText}>X</Text></TouchableOpacity>
              </View>
            )}
            {subjectFilter && (
              <View style={styles.selectedFilterTag}>
                <Text style={styles.selectedFilterText}>{subjectFilter}</Text>
                <TouchableOpacity onPress={() => setSubjectFilter('')}><Text style={styles.removeFilterText}>X</Text></TouchableOpacity>
              </View>
            )}
            {classTypeFilter && (
              <View style={styles.selectedFilterTag}>
                <Text style={styles.selectedFilterText}>Class {classTypeFilter}</Text>
                <TouchableOpacity onPress={() => setClassTypeFilter('')}><Text style={styles.removeFilterText}>X</Text></TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search teacher by subject..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Teacher List */}
        <FlatList
          data={filteredTeachers}
          renderItem={renderTeacher}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFilter: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  scrollView: {
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    backgroundColor: '#f9f9f9',
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
    color: '#222',
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
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  selectedFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedFilterTag: {
    backgroundColor: '#D3E5FF',
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFilterText: {
    color: '#007BFF',
    marginRight: 5,
  },
  removeFilterText: {
    color: '#FF5C5C',
    fontWeight: 'bold',
  },
  clearFiltersButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearFiltersText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TeacherScreen;
