import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Auto-login for development
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' });
    } else {
      localStorage.setItem('token', 'mock-token-12345');
      setUser({ id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' });
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    // Mock login - accept any credentials
    setTimeout(() => {
      localStorage.setItem('token', 'mock-token-12345');
      setUser({ id: 1, name: 'Admin User', email: email || 'admin@example.com', role: 'admin' });
      setLoading(false);
    }, 500);
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      localStorage.setItem('token', 'mock-token-12345');
      setUser({ id: 1, name: userData.name || 'Admin User', email: userData.email, role: 'admin' });
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };