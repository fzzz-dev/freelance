// src/services/customerService.js
import api from './api'

export const customerService = {
  // Get all customers with pagination and filters
  getCustomers: async (params) => {
    return api.get('/customers', { params })
  },

  // Get customer by ID
  getCustomer: async (id) => {
    return api.get(`/customers/${id}`)
  },

  // Search customers
  searchCustomers: async (query) => {
    return api.get('/customers/search', { params: { q: query } })
  },

  // Update customer profile
  updateCustomer: async (id, customerData) => {
    return api.put(`/customers/${id}`, customerData)
  },

  // Block customer
  blockCustomer: async (id) => {
    return api.post(`/customers/${id}/block`)
  },

  // Unblock customer
  unblockCustomer: async (id) => {
    return api.post(`/customers/${id}/unblock`)
  },

  // Get customer orders
  getCustomerOrders: async (id, params) => {
    return api.get(`/customers/${id}/orders`, { params })
  },

  // Get customer addresses
  getCustomerAddresses: async (id) => {
    return api.get(`/customers/${id}/addresses`)
  },

  // Add customer address
  addCustomerAddress: async (id, addressData) => {
    return api.post(`/customers/${id}/addresses`, addressData)
  },

  // Update customer address
  updateCustomerAddress: async (customerId, addressId, addressData) => {
    return api.put(`/customers/${customerId}/addresses/${addressId}`, addressData)
  },

  // Delete customer address
  deleteCustomerAddress: async (customerId, addressId) => {
    return api.delete(`/customers/${customerId}/addresses/${addressId}`)
  },

  // Get customer wishlist
  getCustomerWishlist: async (id) => {
    return api.get(`/customers/${id}/wishlist`)
  },

  // Get customer cart
  getCustomerCart: async (id) => {
    return api.get(`/customers/${id}/cart`)
  },

  // Get customer analytics
  getCustomerAnalytics: async () => {
    return api.get('/customers/analytics')
  },

  // Export customers data
  exportCustomers: async (format = 'csv') => {
    return api.get('/customers/export', { params: { format }, responseType: 'blob' })
  },

  // Delete customer account
  deleteCustomer: async (id) => {
    return api.delete(`/customers/${id}`)
  },

  // Bulk operations
  bulkBlockCustomers: async (ids) => {
    return api.post('/customers/bulk-block', { ids })
  },

  bulkDeleteCustomers: async (ids) => {
    return api.post('/customers/bulk-delete', { ids })
  }
}

export default customerService