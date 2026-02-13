"use client";

import React, { createContext, useState, useContext, useEffect } from 'react'

// Create authentication context
const AuthContext = createContext()

/**
 * Authentication context provider
 * Manages admin authentication state across the application
 * Provides login/logout functionality and user state
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Check for existing authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  /**
   * Login function - stores authentication data in localStorage
   * @param {Object} userData - User information including username
   * @param {string} token - Authentication token
   */
  const login = (userData, token) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminUser', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  /**
   * Logout function - clears authentication data from localStorage
   */
  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use authentication context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}