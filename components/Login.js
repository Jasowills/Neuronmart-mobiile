import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { loginUser, signupUser, loginSuccess } from '../redux/actions/authActions';
import { useSelector } from 'react-redux';

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [refreshLoginForm, setRefreshLoginForm] = useState(false); // State variable to trigger component refresh
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Use useSelector to access the login success state from the Redux store
  const isLoginSuccess = useSelector((state) => state.authe.token); // Adjust 'userData' based on your actual state structure

  useEffect(() => {
    // Refresh the component upon successful login
    if (isLoginSuccess) {
      setRefreshLoginForm(true);
    }
  }, [isLoginSuccess]); // Include isLoginSuccess as a dependency

  useEffect(() => {
    // Reset the state variable after refresh
    if (refreshLoginForm) {
      setRefreshLoginForm(false);
    }
  }, [refreshLoginForm]);

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const validateEmail = (email) => {
    // Check if email contains "@" and ends with ".com"
    return /\S+@\S+\.\S+/.test(email);
  };

  const onLoginPress = async () => {
    try {
      // Validate email format
      if (!validateEmail(loginEmail)) {
        showToast('Invalid email format');
        return;
      }

      // Check if password is not empty
      if (!loginPassword.trim()) {
        showToast('Password cannot be empty');
        return;
      }

      await dispatch(loginUser({
        email: loginEmail,
        password: loginPassword,
      }));

      // Check the login success state
      if (isLoginSuccess) {
        showToast('Login successful');
        navigation.navigate('Home');
      } else {
        // Handle unsuccessful login if needed
        console.error('Login failed');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Login failed:', error);
    }
  };
  const goToSignUp = () => {
    navigation.navigate('SignupForm');  // Replace 'SignUp' with the name of your signup screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder=" "
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=" "
            secureTextEntry
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={onLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
  },
  formContainer: {
    width: '95%',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#555',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#003d29',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountText: {
    marginTop: 10,
    color: 'grey',  // Adjust color as needed
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginForm;
