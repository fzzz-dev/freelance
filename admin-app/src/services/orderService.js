// src/services/orderService.js
import api from './api'

export const orderService = {
  // Get all orders with pagination and filters
  getOrders: async (params) => {
    return api.get('/orders', { params })
  },

  // Get order by ID
  getOrder: async (id) => {
    return api.get(`/orders/${id}`)
  },

  // Create new order
  createOrder: async (orderData) => {
    return api.post('/orders', orderData)
  },

  // Update order
  updateOrder: async (id, orderData) => {
    return api.put(`/orders/${id}`, orderData)
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    return api.patch(`/orders/${id}/status`, { status })
  },

  // Update shipping status
  updateShippingStatus: async (id, status) => {
    return api.patch(`/orders/${id}/shipping`, { status })
  },

  // Cancel order
  cancelOrder: async (id, reason) => {
    return api.post(`/orders/${id}/cancel`, { reason })
  },

  // Get order tracking info
  getOrderTracking: async (id) => {
    return api.get(`/orders/${id}/tracking`)
  },

  // Search orders
  searchOrders: async (query) => {
    return api.get('/orders/search', { params: { q: query } })
  },

  // Get order analytics
  getOrderAnalytics: async (params) => {
    return api.get('/orders/analytics', { params })
  },

  // Get order statistics
  getOrderStats: async () => {
    return api.get('/orders/stats')
  },

  // Generate invoice
  generateInvoice: async (id) => {
    return api.get(`/orders/${id}/invoice`, { responseType: 'blob' })
  },

  // Send order confirmation email
  sendOrderConfirmation: async (id) => {
    return api.post(`/orders/${id}/send-confirmation`)
  },

  // Bulk update order status
  bulkUpdateStatus: async (ids, status) => {
    return api.post('/orders/bulk-update-status', { ids, status })
  },

  // Export orders
  exportOrders: async (params, format = 'csv') => {
    return api.get('/orders/export', { params: { ...params, format }, responseType: 'blob' })
  },

  // Get order items
  getOrderItems: async (id) => {
    return api.get(`/orders/${id}/items`)
  },

  // Add item to order
  addOrderItem: async (id, itemData) => {
    return api.post(`/orders/${id}/items`, itemData)
  },

  // Remove item from order
  removeOrderItem: async (orderId, itemId) => {
    return api.delete(`/orders/${orderId}/items/${itemId}`)
  },

  // Apply refund
  applyRefund: async (id, refundData) => {
    return api.post(`/orders/${id}/refund`, refundData)
  }
}

export default orderService