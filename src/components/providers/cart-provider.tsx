// This is a mock cart provider for demonstration purposes.
// In a real application, you might sync this with Firestore
// for a persistent cart across devices.

'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage
    try {
      const storedCart = localStorage.getItem('shopwave-cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      localStorage.removeItem('shopwave-cart');
    }
  }, []);

  const saveCart = useCallback((cartItems: CartItem[]) => {
    setItems(cartItems);
    localStorage.setItem('shopwave-cart', JSON.stringify(cartItems));
  }, []);

  const addToCart = (productId: string, quantity = 1) => {
    const existingItem = items.find(item => item.productId === productId);
    let newItems;
    if (existingItem) {
      newItems = items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...items, { productId, quantity }];
    }
    saveCart(newItems);
    toast({
      title: "Added to cart!",
      description: "The item has been successfully added to your cart.",
    });
  };

  const removeFromCart = (productId: string) => {
    const newItems = items.filter(item => item.productId !== productId);
    saveCart(newItems);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  };
  
  const clearCart = () => {
    saveCart([]);
  }

  const value = { items, addToCart, removeFromCart, updateQuantity, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
