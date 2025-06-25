import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token and get user data
      checkAuthStatus()
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Mock API call - replace with actual API
      const response = await fetch('/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const user = await response.json()
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call - replace with actual API
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (response.ok) {
        const { user, token } = await response.json()
        localStorage.setItem('token', token)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
        return { success: true }
      } else {
        const error = await response.json()
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Login failed'
        }))
        return { success: false, error: error.message }
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error'
      }))
      return { success: false, error: 'Network error' }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call - replace with actual API
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      
      if (response.ok) {
        const { user, token } = await response.json()
        localStorage.setItem('token', token)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
        return { success: true }
      } else {
        const error = await response.json()
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Registration failed'
        }))
        return { success: false, error: error.message }
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error'
      }))
      return { success: false, error: 'Network error' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    })
  }

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }))
  }

  return {
    ...authState,
    login,
    register,
    logout,
    clearError
  }
} 