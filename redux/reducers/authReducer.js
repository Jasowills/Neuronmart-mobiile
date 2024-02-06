// authReducer.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  RESET_LOGIN_FORM,
} from '../actionTypes';

const initialState = {
  isLoading: false,
  firstname: '',
  lastname: '',
  email: '',
  token: null,
  userId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      const userData = action.payload;

      // Save data to async storage
      saveUserDataToStorage(userData);

      return {
        ...state,
        isLoading: false,
        firstname: userData.user.firstName,
        lastname: userData.user.lastName,
        email: userData.user.email,
        token: userData.token,
        userId: userData.user._id,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case RESET_LOGIN_FORM:
      return {
        ...state,
        error: null,
      };
    case LOGOUT:
      // Clear data from async storage
      clearUserDataFromStorage();

      return initialState;
    default:
      return state;
  }
};

const saveUserDataToStorage = async (userData) => {
  try {
    const serializedUserData = JSON.stringify(userData);
    await AsyncStorage.setItem('userData', serializedUserData);
  } catch (error) {
    console.error('Error saving user data to storage:', error);
  }
};

const clearUserDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error clearing user data from storage:', error);
  }
};

export default authReducer;

// Action creators and async actions remain the same, just include the modifications mentioned in the previous response.
