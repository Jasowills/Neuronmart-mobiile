import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FlashSalesDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://neuron-mart-backend.onrender.com/products"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const allProducts = await response.json();

        if (!Array.isArray(allProducts)) {
          throw new Error("Invalid data format");
        }

        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, 8);

        setProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(item.price)}</Text>     
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003d29" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
   
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCategory: {
    color: "#888",
  },
  productPrice: {
    fontWeight: "bold",
    marginTop: 5,
  },
  productDescription: {
    color: "#444",
  },
});

export default FlashSalesDeals;
