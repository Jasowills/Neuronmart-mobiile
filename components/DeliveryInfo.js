import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Verified from './Verified';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCart from './UseCart';
import { useNavigation } from '@react-navigation/native';


const DeliveryInfo = ({navigation}) => {

  const [checkoutFormData, setCheckoutFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const {subtotal} = useCart()
  const nav = useNavigation()


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Information',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCheckoutFormData = await AsyncStorage.getItem('checkoutFormData');
        setCheckoutFormData(JSON.parse(storedCheckoutFormData) || {});
        
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        setCartItems(JSON.parse(storedCartItems) || []);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);
   
  
  // Extract the firstname, lastname, and email from the checkout form data
  const { first_name, last_name, state, street_address, city, phone_number } = checkoutFormData;
  const total = subtotal; // Replace with your actual subtotal
  const deliveryFee = 1000; // Replace with your actual delivery fee

  const totalPrice = () => {
    return total + deliveryFee;
  };
  
  const navigateToOrder = () => {
    console.log("jds")
    nav.navigate('Order');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.deliveryInfoContainer}>
        <View style={styles.cartHead}>
          <Verified />
          <Text>{" "} DELIVERY ADDRESS</Text>
        </View>
        <View style={styles.infoName}>
          <Text >
            {first_name} {last_name}
          </Text>
        </View>
        <Text style={styles.infoDetails}>
          {state} - {city} | {street_address} | {phone_number}
        </Text>
      </View>

      <View style={styles.deliveryInfoContainer}>
        <View style={styles.cartHead}>
          <Verified /> 
          <Text>{" "} DOOR DELIVERY</Text>
        </View>
        <View style={styles.type}>
          <Text>Door delivery</Text>
          <Text>
            Delivery scheduled <Text style={styles.strongText}>in a week</Text>
          </Text>
        </View>
        <View style={styles.shipment}>
  <Text>Shipment 1/1</Text>
  {cartItems.map((item) => (
    <View key={item.id} style={styles.cartItem}>
      <View key={item.id} style={styles.cartItem}>
        <View style={styles.cartWrap}>
          <View style={styles.cartImage}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>
              {item.name} <Text style={styles.spanText}></Text>
            </Text>
          </View>
          <View style={styles.shipmentCartWrap}>
            <Text>QTY: {item.quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}
</View>
      </View>

      <View style={styles.deliveryInfoContainer}>
        <View style={styles.cartHead}>
          <Verified />
          <Text>{" "}PAYMENT METHOD</Text>
        </View>
        <View style={styles.infoName}>
          <Text>Pay with Cards, Bank Transfer or USSD</Text>
        </View>
        <Text style={styles.infoDetails}>
          You will be redirected to our secure checkout page
        </Text>
      </View>


      <View style={styles.order}>
        <View style={styles.cartHead}>
          <Text style={styles.orderSummaryText}>ORDER SUMMARY</Text>
        </View>
        <View style={styles.subtotal}>
          <Text>Item's total</Text>
          <Text>{new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(subtotal)}</Text>
        </View>
        <View style={styles.subtotal}>
          <Text>Delivery Fee</Text>
          <Text>{new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(deliveryFee)}</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.subtotal}>
          <Text>Total</Text>
          <Text>{new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(totalPrice())}</Text>
        </View>
        <View style={styles.hr} />
        <View onPress={navigateToOrder} style={styles.checkout}>
  <TouchableOpacity onPress={navigateToOrder}>
    <Text style={styles.button}>CONFIRM ORDER</Text>
  </TouchableOpacity>
</View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%"
  },
  deliveryInfoContainer: {
    marginBottom: 16,
    backgroundColor: "white",
    padding: 10
  },
  cartHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoName: {
    marginTop: 8,
  },
  infoDetails: {
    marginTop: 8,
    color: "grey",
  },
  type: {
    marginTop: 8,
  },
  strongText: {
    fontWeight: 'bold',
  },
  shipment: {
    marginTop: 8,
  },
  grey: {
    color: "grey"
  },
  cartItem: {
    marginTop: 8,
  },
  cartWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartImage: {
    flexDirection: 'row',
    width: "70%",
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  spanText: {
    fontWeight: 'bold',
  },
  shipmentCartWrap: {
    marginLeft: 16,
  },
  order: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 16,
  },
  orderSummaryText: {
    fontSize: 16,
    color: "#003d29",
    borderBottomColor: "#003d29",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 15,
     padding: 3,
    fontWeight: 'bold',
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  checkout: {
    marginTop: 16,
    backgroundColor: '#003d29',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DeliveryInfo;
