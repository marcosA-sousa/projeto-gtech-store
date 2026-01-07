
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, role?: 'user' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    setIsLoggedIn(true);
    setUser({ 
      name: role === 'admin' ? 'Administrador' : 'Usuário Digital', 
      email,
      role 
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
