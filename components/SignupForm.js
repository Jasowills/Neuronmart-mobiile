import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/authActions';

const SignupForm = ({ navigation }) => {
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const dispatch = useDispatch();

  const validateFields = () => {
    if (!signupFirstName || !signupLastName || !signupEmail || !signupPassword) {
      Alert.alert('Validation Error', 'All fields are required');
      return false;
    }
    return true;
  };
  const validateEmail = (email) => {
    // Check if email contains "@" and ends with ".com"
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const onSignupPress = async () => {
    if (!validateEmail(signupEmail)) {
      showToast('Invalid email format');
      return;
    }
    if (validateFields()) {
      try {
        await dispatch(signupUser({
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
        }));

        // Navigate to the home screen after successful signup
        navigation.navigate('HomeStack');  // Replace 'Home' with the actual name of your home screen
      } catch (error) {
        // Handle error if needed
        console.error('Signup failed:', error);
      }
    }
  };
 

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create Account',
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* Firstname Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Firstname</Text>
          <TextInput
            style={styles.input}
            placeholder=" "
            value={signupFirstName}
            onChangeText={setSignupFirstName}
          />
        </View>

        {/* Lastname Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Lastname</Text>
          <TextInput
            style={styles.input}
            placeholder=" "
            secureTextEntry={false} // Assuming Lastname should not be hidden
            value={signupLastName}
            onChangeText={setSignupLastName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder=" "
            value={signupEmail}
            onChangeText={setSignupEmail}
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
            value={signupPassword}
            onChangeText={setSignupPassword}
          />
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.button} onPress={onSignupPress}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
});

export default SignupForm;
