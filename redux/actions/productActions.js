import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
    FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
    FETCH_FLASH_SALES_REQUEST,
    FETCH_FLASH_SALES_SUCCESS,
    FETCH_FLASH_SALES_FAILURE,
  } from "../actionTypes";
  
  // Action creators for fetching products
  export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
  });
  
  export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  });
  
  export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  });
  
  // Action creators for fetching products by category
  export const fetchProductsByCategoryRequest = (category) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
    payload: category,
  });
  
  export const fetchProductsByCategorySuccess = (products) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: products,
  });
  
  export const fetchProductsByCategoryFailure = (error) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
    payload: error,
  });
  
  // Action creators for fetching flash sales
  export const fetchFlashSalesRequest = () => ({
    type: FETCH_FLASH_SALES_REQUEST,
  });
  
  export const fetchFlashSalesSuccess = (flashSales) => ({
    type: FETCH_FLASH_SALES_SUCCESS,
    payload: flashSales,
  });
  
  export const fetchFlashSalesFailure = (error) => ({
    type: FETCH_FLASH_SALES_FAILURE,
    payload: error,
  });
  
  // Async action for fetching products
  export const fetchProducts = () => async (dispatch) => {
    dispatch(fetchProductsRequest());
  
    try {
      const response = await fetch("https://neuron-mart-backend.onrender.com/products");
  
      if (response.ok) {
        const products = await response.json();
        dispatch(fetchProductsSuccess(products));
      } else {
        const errorData = await response.json();
        dispatch(fetchProductsFailure(errorData.message || "Failed to fetch products."));
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchProductsFailure("Failed to fetch products."));
    }
  };
  
  // Async action for fetching products by category
  export const fetchProductsByCategory = (category) => async (dispatch) => {
    dispatch(fetchProductsByCategoryRequest(category));
  
    try {
      const response = await fetch(`https://neuron-mart-backend.onrender.com/products/${category}`);
  
      if (response.ok) {
        const products = await response.json();
        dispatch(fetchProductsByCategorySuccess(products));
      } else {
        const errorData = await response.json();
        dispatch(fetchProductsByCategoryFailure(errorData.message || "Failed to fetch products by category."));
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchProductsByCategoryFailure("Failed to fetch products by category."));
    }
  };
  
  // Async action for fetching flash sales
  export const fetchFlashSales = () => async (dispatch) => {
    dispatch(fetchFlashSalesRequest());
  
    try {
      const response = await fetch("https://neuron-mart-backend.onrender.com/products");
  
      if (response.ok) {
        const allProducts = await response.json();
  
        if (!Array.isArray(allProducts)) {
          throw new Error("Invalid data format");
        }
  
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, 8);
  
        dispatch(fetchFlashSalesSuccess(selectedProducts));
      } else {
        const errorData = await response.json();
        dispatch(fetchFlashSalesFailure(errorData.message || "Failed to fetch flash sales."));
      }
    } catch (error) {
      console.error("Error fetching flash sales:", error);
      dispatch(fetchFlashSalesFailure("Failed to fetch flash sales."));
    }
  };
  