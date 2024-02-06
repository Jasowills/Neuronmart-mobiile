import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

const SearchResults = ({ route, navigation }) => {
  const { results } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Search Results',
    });
  }, [navigation]);
  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003d29" />
      </View>
    );
  }

  if (!results || results.length === 0) {
    return (
      <View>
        <Text>No results found.</Text>
      </View>
    );
  }

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const renderProduct = (product) => (
    <TouchableOpacity key={product._id} onPress={() => handleProductPress(product)} style={styles.productContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(product.price)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {results.map(renderProduct)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '48%', // Adjust the width as needed
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResults;
