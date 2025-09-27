
import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://placehold.co/40x40.png'
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    console.log(email, password);
    // Mock login
    setIsLoading(true);
    setTimeout(() => {
        setUser({
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://placehold.co/40x40.png'
        });
        setIsLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  const signUp = async (name: string, email: string, password: string): Promise<void> => {
    console.log(name, email, password);
    // Mock signup
    setIsLoading(true);
    setTimeout(() => {
        setUser({
            id: '1',
            name: name,
            email: email,
            role: 'user',
            avatar: 'https://placehold.co/40x40.png'
        });
        setIsLoading(false);
    }, 1000);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signUp,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
