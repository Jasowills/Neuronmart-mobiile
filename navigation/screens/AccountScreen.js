import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../../components/Login';
import UserInfo from '../../components/Userinfo';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const checkUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // Clear userData state if not found in AsyncStorage
        setUserData(null);
      }
    } catch (error) {
      console.error('Error reading userData from AsyncStorage:', error);
    }
  };
  checkUserData()
  useEffect(() => {
    checkUserData();
  }, []); // Run once when the component mounts

  // Use useFocusEffect to reload data when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      // Call the function to reload data here
      checkUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {userData ? (
        <UserInfo userData={userData} />
      ) : (
        <LoginForm />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
});

export default AccountScreen;
