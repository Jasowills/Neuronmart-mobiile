import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recentlyViewed';

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const loadRecentlyViewed = async () => {
    try {
      const storedRecentlyViewed = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedRecentlyViewed = storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
      setRecentlyViewed(parsedRecentlyViewed);
    } catch (error) {
      console.error('Error loading recently viewed items from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const addToRecentlyViewed = async (product) => {
    setRecentlyViewed((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        prev.unshift(product); // Add the new item to the beginning of the array
        const updatedRecentlyViewed = prev.slice(0, 5); // Keep only the first 5 items
        saveRecentlyViewed(updatedRecentlyViewed); // Save the updated list
        return updatedRecentlyViewed;
      }
      return prev;
    });
  };
  

  const saveRecentlyViewed = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed items to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    saveRecentlyViewed();
  }, [recentlyViewed]);

  const contextValue = {
    recentlyViewed,
    addToRecentlyViewed,
    saveRecentlyViewed,
    loadRecentlyViewed
  };

  return (
    <RecentlyViewedContext.Provider value={contextValue}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
