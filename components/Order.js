import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Order = () => {
  const { confirmPayment } = useStripe();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!confirmPayment || !selectedCountry) {
      setError('Stripe.js hasn\'t loaded yet. Please wait a moment and try again.');
      return;
    }

    setError(null);

    // Simulate basic card number validation
    if (!nameOnCard || nameOnCard.length === 0) {
      setError('Please enter the name on the card.');
      return;
    }

    // Simulate successful payment
    try {
      // You can make the actual Stripe API call here to process the payment
      // For the sake of this example, we will use a simple timeout to simulate the process
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Toast.show({
        text1: 'Payment received successfully!',
        type: 'success',
        onHide: () => {
          navigation.navigate('Home'); // Navigate back to the home page after the toast is closed
        },
      });
    } catch (error) {
      setError('Payment failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.paymentContainer}>
      <Text>Pay with card</Text>
      <View style={styles.hr} />
      <View style={styles.cardElement}>
        <CardField
          placeholder={{ number: '4242 4242 4242 4242' }}
          cardStyle={styles.cardStyle}
          style={styles.cardField}
        />
      </View>
      <View style={styles.nameOnCard}>
        <TextInput
          style={styles.input}
          placeholder="Name on Card"
          value={nameOnCard}
          onChangeText={(text) => setNameOnCard(text)}
        />
      </View>
      <View style={styles.nameOnCard}>
        {/* Replace this with the actual dropdown component */}
        {/* Here, I'm using a simple TextInput for demonstration */}
        <TextInput
          style={styles.input}
          placeholder="Select Country"
          value={selectedCountry}
          onChangeText={(text) => setSelectedCountry(text)}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Pay'}</Text>
      </TouchableOpacity>
      {/* Add react-native-toast-message component at the end of your root component */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles

  paymentContainer: {
    padding: 16,
    marginTop: 16,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  cardElement: {
    marginTop: 8,
  },
  cardStyle: {
    fontSize: 16,
    color: '#424770',
    placeholderColor: '#aab7c4',
    invalidColor: '#9e2146',
  },
  cardField: {
    height: 44,
  },
  nameOnCard: {
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  errorMessage: {
    color: '#9e2146',
    marginTop: 8,
  },
  payButton: {
    marginTop: 16,
    backgroundColor: '#003d29',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Order;
