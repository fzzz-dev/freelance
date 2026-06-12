// src/services/productService.js
import api from './api'

export const productService = {
  // Get all products with pagination and filters
  getProducts: async (params) => {
    return api.get('/products', { params })
  },

  // Get product by ID
  getProduct: async (id) => {
    return api.get(`/products/${id}`)
  },

  // Create new product
  createProduct: async (productData) => {
    return api.post('/products', productData)
  },

  // Update product
  updateProduct: async (id, productData) => {
    return api.put(`/products/${id}`, productData)
  },

  // Delete product
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`)
  },

  // Update product status (published/draft/archived)
  updateProductStatus: async (id, status) => {
    return api.patch(`/products/${id}/status`, { status })
  },

  // Update product stock
  updateProductStock: async (id, stock) => {
    return api.patch(`/products/${id}/stock`, { stock })
  },

  // Bulk update stock
  bulkUpdateStock: async (updates) => {
    return api.post('/products/bulk-stock-update', { updates })
  },

  // Search products
  searchProducts: async (query, params) => {
    return api.get('/products/search', { params: { q: query, ...params } })
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params) => {
    return api.get(`/products/category/${categoryId}`, { params })
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return api.get('/products/featured')
  },

  // Get trending products
  getTrendingProducts: async () => {
    return api.get('/products/trending')
  },

  // Get new arrivals
  getNewArrivals: async () => {
    return api.get('/products/new-arrivals')
  },

  // Get flash sales products
  getFlashSales: async () => {
    return api.get('/products/flash-sales')
  },

  // Get recommended products
  getRecommendedProducts: async (productId) => {
    return api.get(`/products/${productId}/recommended`)
  },

  // Upload product images
  uploadProductImages: async (id, files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return api.post(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Delete product image
  deleteProductImage: async (productId, imageUrl) => {
    return api.delete(`/products/${productId}/images`, { data: { imageUrl } })
  },

  // Reorder product images
  reorderProductImages: async (id, orderedUrls) => {
    return api.post(`/products/${id}/images/reorder`, { orderedUrls })
  },

  // Get product reviews
  getProductReviews: async (id, params) => {
    return api.get(`/products/${id}/reviews`, { params })
  },

  // Add product review (admin)
  addProductReview: async (id, reviewData) => {
    return api.post(`/products/${id}/reviews`, reviewData)
  },

  // Delete product review
  deleteProductReview: async (productId, reviewId) => {
    return api.delete(`/products/${productId}/reviews/${reviewId}`)
  },

  // Get product variants
  getProductVariants: async (id) => {
    return api.get(`/products/${id}/variants`)
  },

  // Add product variant
  addProductVariant: async (id, variantData) => {
    return api.post(`/products/${id}/variants`, variantData)
  },

  // Update product variant
  updateProductVariant: async (productId, variantId, variantData) => {
    return api.put(`/products/${productId}/variants/${variantId}`, variantData)
  },

  // Delete product variant
  deleteProductVariant: async (productId, variantId) => {
    return api.delete(`/products/${productId}/variants/${variantId}`)
  },

  // Export products
  exportProducts: async (params, format = 'csv') => {
    return api.get('/products/export', { params: { ...params, format }, responseType: 'blob' })
  },

  // Import products
  importProducts: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/products/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Bulk delete products
  bulkDeleteProducts: async (ids) => {
    return api.post('/products/bulk-delete', { ids })
  },

  // Duplicate product
  duplicateProduct: async (id) => {
    return api.post(`/products/${id}/duplicate`)
  },

  // Get product analytics
  getProductAnalytics: async () => {
    return api.get('/products/analytics')
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    return api.get('/products/low-stock', { params: { threshold } })
  },

  // Get out of stock products
  getOutOfStockProducts: async () => {
    return api.get('/products/out-of-stock')
  }
}

export default productService