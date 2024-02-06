import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from "react-native";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cartItems from AsyncStorage on component mount
    loadCartItems();
  }, []);

  useEffect(() => {
    // Save the cartItems to AsyncStorage whenever it changes
    saveCartItems();
  }, [cartItems]);
  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');

      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Error loading cart items from AsyncStorage:', error);
    }
  };
  const saveCartItems = async (product) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };

  const addToCart = async (product) => {
    console.log("Adding to cart:", product);
  
    const existingCartItem = cartItems.find((item) => item._id === product._id);
  
    if (existingCartItem) {
      // If the product already exists in the cart, update its quantity
      console.log("Product already in cart:", existingCartItem);
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
  
      setCartItems(updatedCartItems);
  
      // Save the updatedCartItems to AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      // If the product doesn't exist in the cart, add it with quantity set to 1
      console.log("Adding new product to cart:", product);
      const newCartItems = [
        ...cartItems,
        { ...product, quantity: 1 },
      ];
  
      setCartItems(newCartItems);
  
      // Save the newCartItems to AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
  
      showToast("Item Added to Cart Successfully");
    }
  };
  
  
  
  // useEffect to handle side effect (saving to AsyncStorage) after state update
  useEffect(() => {
    saveCartItemsToStorage();
  }, [cartItems]);

  
  const saveCartItemsToStorage = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Cart items saved to AsyncStorage:');
    } catch (error) {
      console.error('Error saving cart items to AsyncStorage:', error);
    }
  };
  

  const removeFromCart = (productId) => {
    console.log("Removing from cart:", productId);

    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    showToast("Item Removed from Cart");
  };

  const decreaseQuantity = (productId) => {
    console.log("Decreasing quantity of:", productId);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    showToast("Item Removed from Cart");
  };

  const increaseQuantity = (productId) => {
    console.log("Increasing quantity of:", productId);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    showToast("Item Added to Cart Successfully");
  };

  const formatPrice = (price) => {
    // You can customize this formatting based on your requirements
    return `₦${price.toFixed(2)}`;
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Calculate and set the subtotal whenever the cartItems change
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return {
    cartItems: [...cartItems], // Create a copy of the cart items to avoid modifying the original objects
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    formatPrice,
    saveCartItemsToStorage,
    saveCartItems,
    loadCartItems,
    subtotal,
  };
};

export default useCart;
