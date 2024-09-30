import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Header from '../components/Header';

const ReorderScreen = () => {
  const [amount, setAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handlePresetAmount = (preset) => {
    setAmount(preset);
  };

  return (
<>
  <Header />
  <ScrollView contentContainerStyle={styles.container}>
      {/* Balance Information */}
      <View style={styles.balanceBox}>
        <View style={styles.balanceRow}>
          <Icon name="info-circle" size={18} color="#007BFF" />
          <Text style={styles.balanceText}>Your Balance</Text>
        </View>
        <Text style={styles.balanceAmount}>₹ 0.00</Text>
        <Text style={styles.balanceSubText}>You can add upto ₹ 50,000</Text>
      </View>

      {/* Top-Up Deals Section */}
      <View style={styles.topUpSection}>
        <Text style={styles.topUpTitle}>Top-Up Deals (2)</Text>
        <View style={styles.dealsRow}>
          <View style={styles.dealBox}>
            <Text style={styles.cashbackText}>Get ₹50 cashback</Text>
            <Text style={styles.dealSubText}>Topup of Rs. 500 or more using Mobikwik UPI.</Text>
          </View>
          <View style={styles.dealBox}>
            <Text style={styles.cashbackText}>Get ₹50 cashback</Text>
            <Text style={styles.dealSubText}>Topup of Rs. 500 or more using Freecharge UPI.</Text>
          </View>
        </View>
      </View>

      {/* Enter Amount Section */}
      <Text style={styles.enterAmountText}>Please enter an amount</Text>
      <TextInput
        style={styles.amountInput}
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="₹ 500"
        keyboardType="numeric"
      />

      {/* Preset Amount Buttons */}
      <View style={styles.presetAmounts}>
        {['₹750', '₹1,000', '₹1,500', '₹2,000'].map((preset, index) => (
          <TouchableOpacity key={index} style={styles.presetButton} onPress={() => handlePresetAmount(preset)}>
            <Text style={styles.presetText}>{preset}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Proceed to Add Money</Text>
      </TouchableOpacity>

      {/* Promo Code Section */}
      <View style={styles.promoCodeSection}>
        <TextInput
          style={styles.promoCodeInput}
          placeholder="Enter Promo Code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  balanceBox: {
    backgroundColor: '#EAF5FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 80,
    marginTop:40
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#007BFF',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceSubText: {
    color: '#777',
    marginTop: 5,
  },
  topUpSection: {
    marginBottom: 20,
  },
  topUpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dealsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealBox: {
    width: '48%',
    backgroundColor: '#EAF5FF',
    padding: 10,
    borderRadius: 10,
  },
  cashbackText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  dealSubText: {
    color: '#777',
    marginTop: 5,
    fontSize: 12,
  },
  enterAmountText: {
    fontSize: 16,
    marginBottom: 10,
  },
  amountInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  presetAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  presetButton: {
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  presetText: {
    fontSize: 16,
    color: '#007BFF',
  },
  proceedButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promoCodeInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  applyButton: {
    backgroundColor: '#CCC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  applyText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default ReorderScreen;
