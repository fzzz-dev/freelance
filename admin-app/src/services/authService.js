// src/services/authService.js
import api from './api'

export const authService = {
  // Admin login
  login: async (email, password) => {
    return api.post('/auth/login', { email, password })
  },

  // Admin registration
  register: async (userData) => {
    return api.post('/auth/register', userData)
  },

  // Get admin profile
  getProfile: async () => {
    return api.get('/auth/profile')
  },

  // Update admin profile
  updateProfile: async (data) => {
    return api.put('/auth/profile', data)
  },

  // Change password
  changePassword: async (data) => {
    return api.post('/auth/change-password', data)
  },

  // Forgot password - send reset link
  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email })
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword })
  },

  // Verify email
  verifyEmail: async (token) => {
    return api.post('/auth/verify-email', { token })
  },

  // Logout (clear session on server)
  logout: async () => {
    return api.post('/auth/logout')
  },

  // Refresh token
  refreshToken: async () => {
    return api.post('/auth/refresh-token')
  },

  // Update admin settings
  updateSettings: async (settings) => {
    return api.put('/auth/settings', settings)
  },

  // Get all admins (super admin only)
  getAllAdmins: async () => {
    return api.get('/auth/admins')
  },

  // Create new admin (super admin only)
  createAdmin: async (adminData) => {
    return api.post('/auth/admins', adminData)
  },

  // Delete admin (super admin only)
  deleteAdmin: async (id) => {
    return api.delete(`/auth/admins/${id}`)
  }
}

export default authService