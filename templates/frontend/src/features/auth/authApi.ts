import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  token: string
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response.data
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, data)
    return response.data
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem('token')
    if (token) {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const token = localStorage.getItem('token')
    const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
} 