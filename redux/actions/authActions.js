import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT,
    RESET_LOGIN_FORM,
  } from "../actionTypes";
  
  // Action creators for login
  export const loginRequest = () => ({
    type: LOGIN_REQUEST,
  });
  
  export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });
  
  export const resetLoginForm = () => ({
    type: RESET_LOGIN_FORM,
  });
  
  // Action creators for signup
  export const signupRequest = () => ({
    type: SIGNUP_REQUEST,
  });
  
  export const signupSuccess = (userData) => ({
    type: SIGNUP_SUCCESS,
    payload: userData,
  });
  
  export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: error,
  });
  
  // Action creator for logout
  export const logout = () => ({
    type: LOGOUT,
  });
  
  // Async action for login
  export const loginUser = (data, navigation) => async (dispatch) => {
    dispatch(loginRequest());
  
    try {
      const response = await fetch("https://indigo-indri-slip.cyclic.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        dispatch(loginSuccess(userData));
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message || "Login failed. Please try again."));
      }
    } catch (error) {
      console.error(error);
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };
  
  // Async action for signup
  export const signupUser = (data) => async (dispatch) => {
    dispatch(signupRequest());
  
    try {
      const response = await fetch("https://indigo-indri-slip.cyclic.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        dispatch(signupSuccess(userData));
      } else {
        const errorData = await response.json();
        dispatch(signupFailure(errorData.message || "Signup failed. Please try again."));
      }
    } catch (error) {
      console.error(error);
      dispatch(signupFailure("Signup failed. Please try again."));
    }
  };
  