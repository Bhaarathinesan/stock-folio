/**
 * API Configuration
 * 
 * This file centralizes API configuration using environment variables.
 * When the client provides the real API, only update the .env file.
 */

// API Base URL from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sncace1.free.beeceptor.com';

// API Key from environment variables
export const API_KEY = import.meta.env.VITE_API_KEY || 'dummy_api_key_12345';

/**
 * Default headers for API requests
 */
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

/**
 * Helper function to construct full API endpoint URLs
 * Handles trailing slashes properly
 */
export const buildApiUrl = (endpoint) => {
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};
