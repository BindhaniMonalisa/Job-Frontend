import axios from 'axios'

const API_URL = '/api'

/**
 * Auth Service - handles authentication-related API calls
 * Provides functions for admin login and token management
 */

/**
 * Authenticates admin user with username and password
 * @param {Object} credentials - Login credentials {username, password}
 * @returns {Promise<Object>} Response object with success status and token
 */
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials)
    return response.data
  } catch (error) {
    console.error('Login error:', error)

    // Provide more specific error messages based on response
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed')
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check your connection.')
    } else {
      throw new Error('An unexpected error occurred during login.')
    }
  }
}

/**
 * Validates current admin token
 * @returns {Promise<Object>} Response object with validation result
 */
export const validateToken = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      return { valid: false }
    }

    // In a real application, this would validate with the server
    // For demo purposes, we'll just check if token exists
    return { valid: true }
  } catch (error) {
    console.error('Token validation error:', error)
    return { valid: false }
  }
}

/**
 * Logs out admin user by clearing local storage
 * In production, this would also invalidate the token on the server
 */
export const adminLogout = () => {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminUser')
}