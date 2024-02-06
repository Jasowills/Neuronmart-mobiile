import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RecentlyViewedItem = ({ item, handleProductPress }) => {
  return (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
          }).format(item.price)}
        </Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCategory: {
    color: '#888',
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  productDescription: {
    color: '#444',
  },
});

export default RecentlyViewedItem;
