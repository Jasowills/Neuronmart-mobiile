import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import useCart from '../../components/UseCart';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Cart = () => {
  const {
    cartItems,
    subtotal,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    formatPrice,
    loadCartItems,
  } = useCart();
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulating asynchronous data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // This function will be called when the screen comes into focus
      loadCartItems()
    }, [])
  );

  const handleCheckout = async () => {
    try {
      const storedCheckoutFormData = await AsyncStorage.getItem('checkoutFormData');
  
      if (storedCheckoutFormData) {
        // If 'checkoutFormData' exists, navigate to 'DeliveryInfo'
        navigation.navigate('DeliveryInfo');
      } else {
        // If 'checkoutFormData' doesn't exist, navigate to 'Checkout'
        navigation.navigate('Checkout');
      }
    } catch (error) {
      console.error('Error checking AsyncStorage for checkoutFormData:', error);
    }
  };
  
  

  const handleRefresh = async () => {
    // setIsRefreshing(true);
  
    // try {
    //   // Use await here to wait for the loadCartItems to complete
    //   await loadCartItems();
    //   console.log(cartItems, "items"); // Now this should log the updated cart items
    // } catch (error) {
    //   console.error("Error during refresh:", error);
    // } finally {
    //   setIsRefreshing(false);
    // }
  };
  

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      style={styles.body}
    >
      <View style={styles.cartContainer}>
        <Text style={styles.cartHead}>Cart</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item._id} style={styles.cartItem}>
                <View style={styles.cartWrap}>
                  <View style={styles.cartImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.cartImage} />
                    <Text style={{ color: "#003d29", textAlign: "center" }}>
                      {" "}  {item.name}
                    </Text>
                  </View>
                  <View style={styles.cartPrice}>
                    <Text style={{ fontWeight: "bold", textAlign: "right" }}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "NGN",
                      }).format(item.price)}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item._id)}
                  >
                    <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>-</Text>
                  </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item._id)}
                  >
                    <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                    <Text style={styles.removeButton}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.line} />
              </View>
            ))}
            {cartItems.length === 0 && <Text>Your cart is empty.</Text>}
          </>
        )}
      </View>
      <View style={styles.cartSummary}>
        <Text style={styles.cartSummaryHead}>Cart Summary</Text>
        <Text style={styles.subtotal}>
          Subtotal: {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(subtotal)}
        </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#eee",
    height: '100%',
    padding: 10,
  },
  cartSummary: {
     marginTop: 55, 
     padding: 10,
     marginBottom: 20,
     backgroundColor: "white"
  },
  cartContainer: {
    padding: 20,
    backgroundColor: "white"
    // height: 50,
    // width: "100%",
  },
  cartHead: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#003d29",
    padding: 3,
    marginBottom: 20,
    borderBottomWidth: 1,
    width: "100%",
  }, cartSummaryHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#003d29",
    padding: 3,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "100%",
  },
  cartItem: {
    marginBottom: 10,
  },
  cartWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  cartImageContainer: {
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  cartImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    flexDirection: "row",
  },
  cartPrice: {
    flex: 1,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: "100%",
  },
  removeButton: {
    color: 'red',
    marginLeft: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: '#003d29',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityButton: {
    fontSize: 16,
    width: 30,
    padding: 3,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#003d29",
    color: "white",
  },
});


export default Cart;
