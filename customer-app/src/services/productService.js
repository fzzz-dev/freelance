// src/services/productService.js
import api from './api'

export const productService = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  searchProducts: (query) => api.get('/products/search', { params: query }),
  getCategories: () => api.get('/categories'),
  getFlashSales: () => api.get('/products/flash-sales'),
  getTrending: () => api.get('/products/trending'),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  getRecommended: () => api.get('/products/recommended'),
  getCategoryProducts: (categoryId) => api.get(`/categories/${categoryId}/products`),
}

export default productService