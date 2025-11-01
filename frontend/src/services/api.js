/**
 * API Service
 * Centralized API configuration and functions.
 * All backend API calls go through this service.
 */

import axios from 'axios';

// Get API URL from environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Create Axios instance with default configuration
 * This instance will be used for all API requests
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Request Interceptor
 * Runs before every request
 * Useful for adding auth tokens, logging, etc.
 */
api.interceptors.request.use(
  (config) => {
    // Example: Add auth token to headers
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Runs after every response
 * Useful for handling errors globally, refreshing tokens, etc.
 */
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx trigger this function
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
      
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          // window.location.href = '/login';
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Property API Functions
 * Object containing all API methods for property operations
 */
export const propertyAPI = {
  /**
   * Get all properties
   * 
   * @param {Object} filters - Optional query parameters for filtering
   * @param {string} filters.type - Filter by property type
   * @param {string} filters.search - Search query
   * @param {number} filters.minPrice - Minimum price filter
   * @param {number} filters.maxPrice - Maximum price filter
   * @returns {Promise<Array>} Array of property objects
   * 
   * @example
   * const properties = await propertyAPI.getAllProperties({ type: 'Plot' });
   */
  getAllProperties: async (filters = {}) => {
    try {
      // Build query string from filters object
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `/properties?${queryParams}` : '/properties';
      
      const response = await api.get(url);
      return response.data.data; // Return the data array from API response
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  /**
   * Get single property by ID
   * 
   * @param {string} id - Property ID (MongoDB ObjectId)
   * @returns {Promise<Object>} Property object
   * @throws {Error} If property not found or request fails
   * 
   * @example
   * const property = await propertyAPI.getProperty('507f1f77bcf86cd799439011');
   */
  getProperty: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  },

  /**
   * Create new property
   * 
   * @param {Object} propertyData - Property data to create
   * @param {string} propertyData.name - Property name
   * @param {string} propertyData.type - Property type
   * @param {string} propertyData.location - Property location
   * @param {number} propertyData.price - Property price
   * @param {string} propertyData.description - Property description
   * @returns {Promise<Object>} Created property object
   * @throws {Error} If validation fails or request fails
   * 
   * @example
   * const newProperty = await propertyAPI.createProperty({
   *   name: 'New Plot',
   *   type: 'Plot',
   *   location: 'Mumbai',
   *   price: 500000,
   *   description: 'Beautiful plot'
   * });
   */
  createProperty: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  /**
   * Update existing property
   * 
   * @param {string} id - Property ID to update
   * @param {Object} propertyData - Updated property data
   * @returns {Promise<Object>} Updated property object
   * @throws {Error} If property not found or validation fails
   * 
   * @example
   * const updated = await propertyAPI.updateProperty('507f...', { price: 600000 });
   */
  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  /**
   * Delete property
   * 
   * @param {string} id - Property ID to delete
   * @returns {Promise<Object>} Success response
   * @throws {Error} If property not found or deletion fails
   * 
   * @example
   * await propertyAPI.deleteProperty('507f1f77bcf86cd799439011');
   */
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },
};

// Export the axios instance for custom requests
export default api;