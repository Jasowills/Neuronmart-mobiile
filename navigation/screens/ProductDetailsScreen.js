import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useCart from '../../components/UseCart';
import { useRecentlyViewed } from '../../components/RecentlyViewedContext'; // Replace with the correct path

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { saveCartItems, addToCart, saveCartItemsToStorage} = useCart();
  const { addToRecentlyViewed, saveRecentlyViewed } = useRecentlyViewed(); // Retrieve addToRecentlyViewed function

  React.useEffect(() => {
    addToRecentlyViewed(product); // Add the product to the recently viewed list
  }, [product]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product Details',
    });
  }, [navigation]);

  const handleAddToCart = () => {
    // Assuming addToCart updates the cartItems state
    addToCart(product);
  
    // Assuming saveCartItemsToStorage saves the current cartItems to AsyncStorage
    saveCartItemsToStorage();
  
    console.log('Product added to cart:', product.name);
  };
  

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(product.price);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>
          Category: <Text style={styles.categoryText}>{product.category}</Text>
        </Text>
        <Text style={styles.productPrice}>{formattedPrice}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    marginBottom: 10,
  },
  productCategory: {
    color: "#888",
    marginBottom: 10,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    color: "#444",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#003d29",
    padding: 12,
    textAlign: "center",
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  productContainer: {
     backgroundColor: "#fff",
     width: "100%",
     padding: 10,
  },
  categoryText: {
    color: "#0A71E0"
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10
  }

});

export default ProductDetailsScreen;
