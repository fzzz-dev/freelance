// src/services/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/admin'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth Service
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.post('/auth/change-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
}

// Category Service
export const categoryService = {
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
}

// Product Service
export const productService = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  updateProductStatus: (id, status) => api.patch(`/products/${id}/status`, { status }),
}

// Order Service
export const orderService = {
  getOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  updateShippingStatus: (id, status) => api.patch(`/orders/${id}/shipping`, { status }),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel`),
}

// Customer Service
export const customerService = {
  getCustomers: (params) => api.get('/customers', { params }),
  getCustomer: (id) => api.get(`/customers/${id}`),
  updateCustomerStatus: (id, status) => api.patch(`/customers/${id}/status`, { status }),
  getCustomerOrders: (id) => api.get(`/customers/${id}/orders`),
}

// Analytics Service
export const analyticsService = {
  getStats: () => api.get('/analytics/stats'),
  getSalesAnalytics: (period) => api.get('/analytics/sales', { params: { period } }),
  getRevenueAnalytics: (period) => api.get('/analytics/revenue', { params: { period } }),
  getProductPerformance: () => api.get('/analytics/products'),
  getUserGrowth: () => api.get('/analytics/users'),
}

export default api