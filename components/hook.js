import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recentlyViewed';

export const useRecentlyHook = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const loadRecentlyViewed = async () => {
    try {
      const storedRecentlyViewed = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedRecentlyViewed = storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
      console.log(parsedRecentlyViewed, "ll")
      setRecentlyViewed(parsedRecentlyViewed);
    } catch (error) {
      console.error('Error loading recently viewed items from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        const updatedRecentlyViewed = [
          product,
          ...prev.slice(0, 4), // Keep only the first 5 items
        ];
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

  return { recentlyViewed, addToRecentlyViewed, loadRecentlyViewed };
};
