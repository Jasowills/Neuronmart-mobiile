// MainContainer.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../components/Search';
import SearchResults from './screens/SearchResults';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/CategoriesScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SignupForm from '../components/SignupForm';
import CheckoutForm from '../components/Checkout';
import DeliveryInfo from '../components/DeliveryInfo';
import Order from '../components/Order';
const homeName = "Home";
const detailsName = "Categories";
const cartName = "Cart";
const AccountName = "Account"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="SearchResults" component={SearchResults} initialParams={{ results: [] }} />
      <Stack.Screen name="SignupForm" component={SignupForm} />
      <Stack.Screen name="Checkout" component={CheckoutForm} />
      <Stack.Screen name="DeliveryInfo" component={DeliveryInfo} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route, navigation }) => ({
          header: () => (
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#003d29', padding: 15 }}>
              <Image
                source={require('../assets/neuronmartlogo.png')}
                style={{ width: 35, height: 35, borderRadius: 20 }}
              />
              <Search onSearch={(text) => navigation.navigate('SearchResults', { searchTerm: text })} navigation={navigation} />
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === cartName) {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (rn === AccountName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#003d29',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 5, fontSize: 10 },
          style: { paddingTop: 10, height: 70 }
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={cartName} component={CartScreen} />
        <Tab.Screen name={AccountName} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;


