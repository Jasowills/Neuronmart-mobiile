import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useRecentlyViewed } from './RecentlyViewedContext';
import { useRecentlyHook } from './hook';
import { useFocusEffect } from '@react-navigation/native';
import LoginForm from './Login';

const UserInfo = ({ userData }) => {
  const dispatch = useDispatch();
  const [forceUpdateKey, setForceUpdateKey] = useState(0);
  const { recentlyViewed, addToRecentlyViewed, loadRecentlyViewed } = useRecentlyViewed();
  // const { loadRecentlyViewed } = useRecentlyHook();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRecentlyViewed();
    setRefreshing(false);
  }, [loadRecentlyViewed]);

  const forceUpdate = () => setForceUpdateKey((prevKey) => prevKey + 1);

  const handleLogout = () => {
    // Clear recently viewed items and trigger a re-render
    addToRecentlyViewed([]);
    dispatch(logout());
    forceUpdate(); // Trigger re-render
  };

  const handleProductPress = (item) => {
    console.log('Product pressed:', item.name);
    // Implement the navigation logic here
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name} {console.log(item, "item")}</Text>
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

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <RecentlyViewedItem
          item={item}
          handleProductPress={handleProductPress}
        />
      );
    } else {
      return renderProductItem({ item });
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecentlyViewed();
    }, [])
  );

  return (
    <View style={styles.container}>
    <View style={styles.containerNav}>
      <Text style={styles.greetingText}>Hey, {userData.user.firstName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>

    <Info userData={userData} />
    <View style={styles.container1}>
      <View style={styles.flashSales}>
        <View style={styles.icon}>
          <Text style={styles.text}>Recently Viewed</Text>
        </View>
      </View>
      
      <FlatList
        data={recentlyViewed}
        keyExtractor={(item) => item._id} // Assuming id is a unique identifier
        renderItem={renderItem}
        horizontal
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          
        }
      />
    </View>
  </View>
  );
};
const Info = ({ userData }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.sectionTitle}>User Information</Text>
      <View style={styles.infoItem}>
        <Text>Firstname: {userData.user.firstName}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text>Lastname: {userData.user.lastName}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text>Email: {userData.user.email}</Text>
      </View>
    </View>
  );
};

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
  container: {
    height: '100%',
    padding: 5,
    flex: 1,
    width: '100%',
  },
  containerNav: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#003d29',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 15,
    marginTop: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    marginBottom: 10,
  },
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
  container1: {
    height: "100%",
    flex: 1,
  },
  flashSales: {
    backgroundColor: "#003d29",
    padding: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  text: {
    color: "#fff",
  },
  
});

export default UserInfo;
