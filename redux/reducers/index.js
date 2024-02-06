// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from "./productReducer"
// import other reducers

const rootReducer = combineReducers({
  authe: authReducer,
  products: productReducer
  // add other reducers
});

export default rootReducer;
