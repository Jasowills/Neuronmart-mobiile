import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CheckoutForm = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    state: '',
    local_government_area: '',
    street_address: '',
  });

  useEffect(() => {
    if (userData && userData.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        first_name: userData.user.firstName ? userData.user.firstName.trim() : '',
        last_name: userData.user.lastName ? userData.user.lastName.trim() : '',
        email: userData.user.email ? userData.user.email.trim() : '',
      }));
    }
  }, [userData]);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => {
      return value ? { ...prevFormData, [name]: value } : prevFormData;
    });
  };

  const handleFormSubmit = async () => {
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.phone_number.trim() ||
      !formData.street_address.trim() ||
      !formData.state.trim()
    ) {
      console.error('Please fill in all required fields');
      ToastAndroid.show('Fill all fields', ToastAndroid.LONG);
      return;
    }
    try {
      await AsyncStorage.setItem('checkoutFormData', JSON.stringify(formData));
      ToastAndroid.show('Information Received', ToastAndroid.SHORT);
      navigation.navigate('DeliveryInfo');
    } catch (error) {
      console.error('Error saving form data to AsyncStorage:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartHead}>
        <Text>1. BILLING & SHIPPING</Text>
      </View>
      <View style={styles.names}>
        <View style={styles.nameContainer}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={formData.first_name}
            onChangeText={(value) => handleInputChange('first_name', value)}
            required
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={formData.last_name}
            onChangeText={(value) => handleInputChange('last_name', value)}
            required
          />
        </View>
      </View>
      <View style={styles.phoneNumber}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          required
        />
      </View>
      <View style={styles.phoneNumber}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={formData.phone_number}
          onChangeText={(value) => handleInputChange('phone_number', value)}
          keyboardType="phone-pad"
          required
        />
      </View>
      <View style={styles.phoneNumber}>
        <Text style={styles.label}>Street Address *</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={formData.street_address}
          onChangeText={(value) => handleInputChange('street_address', value)}
          required
        />
      </View>
      <View style={styles.phoneNumber}>
        <Text style={styles.label}>Your State *</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={formData.state}
          onChangeText={(value) => handleInputChange('state', value)}
          required
        />
      </View>
      <View style={styles.phoneNumber}>
        <Text style={styles.label}>Local Government Area *</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={formData.local_government_area}
          onChangeText={(value) => handleInputChange('local_government_area', value)}
          required
        />
      </View>
      <View style={{ ...styles.saveButton, backgroundColor: "#003d29" }}>
        <Button style={styles.button} title="Proceed" onPress={handleFormSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cartHead: {
    marginBottom: 16,
  },
  names: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nameContainer: {
    flex: 1,
    marginRight: 8,
  },
  phoneNumber: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },

  button: {
    backgroundColor: "#003d29"
  }
});

export default CheckoutForm;
