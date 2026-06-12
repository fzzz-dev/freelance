// src/services/analyticsService.js
import api from './api'

export const analyticsService = {
  // Get main dashboard statistics
  getStats: async () => {
    return api.get('/analytics/stats')
  },

  // Get sales analytics data
  getSalesAnalytics: async (period = 'monthly') => {
    return api.get('/analytics/sales', { params: { period } })
  },

  // Get revenue analytics data
  getRevenueAnalytics: async (period = 'monthly') => {
    return api.get('/analytics/revenue', { params: { period } })
  },

  // Get product performance data
  getProductPerformance: async () => {
    return api.get('/analytics/products')
  },

  // Get user/customer growth data
  getUserGrowth: async (period = 'monthly') => {
    return api.get('/analytics/users', { params: { period } })
  },

  // Get category performance data
  getCategoryPerformance: async () => {
    return api.get('/analytics/categories')
  },

  // Get order analytics
  getOrderAnalytics: async () => {
    return api.get('/analytics/orders')
  },

  // Get inventory analytics
  getInventoryAnalytics: async () => {
    return api.get('/analytics/inventory')
  },

  // Get customer analytics
  getCustomerAnalytics: async () => {
    return api.get('/analytics/customers')
  },

  // Get revenue chart data for specific date range
  getRevenueChart: async (startDate, endDate) => {
    return api.get('/analytics/revenue-chart', { params: { startDate, endDate } })
  },

  // Get sales by region
  getSalesByRegion: async () => {
    return api.get('/analytics/sales-by-region')
  },

  // Get top selling products
  getTopProducts: async (limit = 10) => {
    return api.get('/analytics/top-products', { params: { limit } })
  },

  // Get conversion rate analytics
  getConversionRate: async () => {
    return api.get('/analytics/conversion-rate')
  },

  // Export analytics report
  exportReport: async (type, format = 'csv') => {
    return api.get('/analytics/export', { params: { type, format }, responseType: 'blob' })
  }
}

export default analyticsService