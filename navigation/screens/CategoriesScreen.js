import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ProductListScreen = ({ route, navigation }) => {
  const { selectedCategory, selectedTab } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://indigo-indri-slip.cyclic.app/products/${selectedCategory}`);
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#003d29" />
      ) : (
        <View style={styles.productContainer}>
          {products.map((item, index) => (
            <TouchableOpacity key={item._id} style={styles.productItem} onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "NGN",
                }).format(item.price)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const DetailsScreen = () => (
  <Tab.Navigator
    initialRouteName="Electronics" // Set a default initial route name
    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      tabBarItemStyle: {
        width: 'auto',
      },
      tabBarIndicatorStyle: {
        color: "#003d29",

        backgroundColor: '#003d29',
      },
    }}
  >
    <Tab.Screen name="Electronics" component={ProductListScreen} initialParams={{ selectedCategory: 'Electronics', selectedTab: 'Electronics' }} />
    <Tab.Screen name="Appliances" component={ProductListScreen} initialParams={{ selectedCategory: 'Appliances', selectedTab: 'Appliances' }} />
    <Tab.Screen name="Gaming" component={ProductListScreen} initialParams={{ selectedCategory: 'Gaming', selectedTab: 'Gaming' }} />
    <Tab.Screen name="Health & Beauty" component={ProductListScreen} initialParams={{ selectedCategory: 'Skin%20care', selectedTab: 'Health & Beauty' }} />
    <Tab.Screen name="Supermarket" component={ProductListScreen} initialParams={{ selectedCategory: 'Food', selectedTab: 'Supermarket' }} />
    <Tab.Screen name="Phones & Tablets" component={ProductListScreen} initialParams={{ selectedCategory: 'Phones & tablets', selectedTab: 'Phones & Tablets' }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%', // Adjust the width as needed for two items per row
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
});

export default DetailsScreen;
