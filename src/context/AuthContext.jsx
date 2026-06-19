/**
 * Authentication Context
 * 
 * Provides global authentication state management using React Context API.
 * This context wraps the entire application and provides:
 * - isAuthenticated: boolean
 * - token: string | null
 * - user: object | null
 * - login: function
 * - logout: function
 */

import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedAuth === 'true' && storedUser) {
        setToken(storedToken);
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      } else {
        // Clear inconsistent state
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login function
   * 
   * @param {string} newToken - Authentication token
   * @param {object} userData - User data object
   * @returns {boolean} - Success status
   */
  const login = (newToken, userData) => {
    if (!newToken || typeof newToken !== 'string') {
      console.error('Invalid token provided to login');
      return false;
    }

    if (!userData || typeof userData !== 'object') {
      console.error('Invalid user data provided to login');
      return false;
    }

    try {
      // Update state
      setToken(newToken);
      setIsAuthenticated(true);
      setUser(userData);

      // Persist to localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      
      // Continue with in-memory state even if localStorage fails
      setToken(newToken);
      setIsAuthenticated(true);
      setUser(userData);
      
      return true;
    }
  };

  /**
   * Logout function
   * Clears authentication state and redirects to login
   */
  const logout = () => {
    try {
      // Clear state
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);

      // Clear localStorage
      authService.logout();

      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Clear state even if localStorage fails
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      
      return true;
    }
  };

  const value = {
    isAuthenticated,
    token,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use authentication context
 * 
 * @returns {object} Authentication context
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
