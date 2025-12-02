'use client';

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'shopwave-browsing-history';
const MAX_HISTORY_LENGTH = 20;

export const useBrowsingHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load browsing history from localStorage', error);
      localStorage.removeItem(HISTORY_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addProductToHistory = useCallback((productId: string) => {
    if (!isLoaded) return;
    
    setHistory(prevHistory => {
      // Remove product if it already exists to move it to the front
      const newHistory = prevHistory.filter(id => id !== productId);
      // Add the new product to the front
      newHistory.unshift(productId);
      // Trim the history to the max length
      const trimmedHistory = newHistory.slice(0, MAX_HISTORY_LENGTH);
      
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
      } catch (error) {
        console.error('Failed to save browsing history to localStorage', error);
      }

      return trimmedHistory;
    });
  }, [isLoaded]);

  return { history, addProductToHistory, isLoaded };
};
