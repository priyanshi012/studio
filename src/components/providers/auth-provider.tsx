// This is a mock auth provider for demonstration purposes.
// In a real application, you would replace the localStorage logic
// with calls to Firebase Authentication.

'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage to persist login
    try {
      const storedUser = localStorage.getItem('shopwave-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('shopwave-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // MOCK LOGIN: In a real app, you'd call signInWithEmailAndPassword from Firebase
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
    const mockUser: User = { id: 'mock-user-id-' + new Date().getTime(), email, name: 'John Doe' };
    localStorage.setItem('shopwave-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
    router.push('/');
  };

  const signup = async (email: string, pass: string, name: string) => {
    // MOCK SIGNUP: In a real app, you'd call createUserWithEmailAndPassword from Firebase
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
    const mockUser: User = { id: 'mock-user-id-' + new Date().getTime(), email, name };
    localStorage.setItem('shopwave-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
    router.push('/');
  };

  const logout = () => {
    // MOCK LOGOUT: In a real app, you'd call signOut from Firebase
    localStorage.removeItem('shopwave-user');
    setUser(null);
    router.push('/login');
  };

  const value = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
