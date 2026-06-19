/**
 * Authentication Service
 * 
 * This service handles all authentication-related API calls.
 * 
 * CLIENT INTEGRATION POINT:
 * When the client provides the real API:
 * 1. Update .env file with real API_BASE_URL and API_KEY
 * 2. Update the login() method below to match the real API endpoint (if needed)
 * 3. Update response handling to match the real API response structure
 * 
 * NO UI CODE NEEDS TO CHANGE - only this file!
 */

import axios from 'axios';
import { buildApiUrl, getDefaultHeaders } from '../utils/api';

/**
 * Mock credentials for development
 * Remove this when integrating with real API
 */
const MOCK_CREDENTIALS = {
  email: 'demo@portfolio.com',
  password: 'Portfolio@123',
};

/**
 * Login function
 * 
 * @param {string} email - User email (max 254 characters)
 * @param {string} password - User password (max 128 characters)
 * @returns {Promise<{success: boolean, token: string|null, user: object|null, error: string|null}>}
 * 
 * TODO: Replace with production API endpoint POST /auth/login
 * Expected request payload: { email: string, password: string }
 * Expected response: { success: boolean, token: string, user: { id, name, email } }
 */
export const login = async (email, password) => {
  try {
    // Input validation
    if (!email || email.length === 0) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Email is required',
      };
    }

    if (!email.includes('@')) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Invalid email format',
      };
    }

    if (email.length > 254) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Invalid input length',
      };
    }

    if (!password || password.length === 0 || password.trim().length === 0) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Password is required',
      };
    }

    if (password.length > 128) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Invalid input length',
      };
    }

    // MOCK IMPLEMENTATION - Remove when client API is ready
    // This simulates API delay and mock authentication
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          name: 'Demo User',
          email: 'demo@portfolio.com',
        },
        error: null,
      };
    } else {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Invalid email or password',
      };
    }

    // PRODUCTION IMPLEMENTATION - Uncomment when client API is ready
    /*
    const response = await axios.post(
      buildApiUrl('/auth/login'),
      { email, password },
      { 
        headers: getDefaultHeaders(),
        timeout: 10000, // 10 second timeout
      }
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        error: null,
      };
    } else {
      return {
        success: false,
        token: null,
        user: null,
        error: response.data?.error || 'Invalid email or password',
      };
    }
    */
  } catch (error) {
    // Network error handling
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Network error. Please check your connection',
      };
    }

    if (!error.response) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Network error. Please check your connection',
      };
    }

    // HTTP error handling
    const status = error.response?.status;
    
    if (status === 401) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Invalid email or password',
      };
    }

    if (status === 500 || status === 503) {
      return {
        success: false,
        token: null,
        user: null,
        error: 'Service unavailable. Please try again later',
      };
    }

    return {
      success: false,
      token: null,
      user: null,
      error: error.response?.data?.message || 'An error occurred. Please try again',
    };
  }
};

/**
 * Logout function
 * Clears authentication state
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
};
