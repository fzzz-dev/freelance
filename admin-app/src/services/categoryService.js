// src/services/categoryService.js
import api from './api'

export const categoryService = {
  // Get all categories (with nested structure)
  getCategories: async () => {
    return api.get('/categories')
  },

  // Get category by ID
  getCategory: async (id) => {
    return api.get(`/categories/${id}`)
  },

  // Get category tree (nested structure)
  getCategoryTree: async () => {
    return api.get('/categories/tree')
  },

  // Create new category
  createCategory: async (categoryData) => {
    return api.post('/categories', categoryData)
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    return api.put(`/categories/${id}`, categoryData)
  },

  // Delete category
  deleteCategory: async (id) => {
    return api.delete(`/categories/${id}`)
  },

  // Get subcategories
  getSubcategories: async (parentId) => {
    return api.get(`/categories/${parentId}/subcategories`)
  },

  // Update category status (active/inactive)
  updateCategoryStatus: async (id, status) => {
    return api.patch(`/categories/${id}/status`, { status })
  },

  // Reorder categories
  reorderCategories: async (orderedIds) => {
    return api.post('/categories/reorder', { orderedIds })
  },

  // Bulk delete categories
  bulkDeleteCategories: async (ids) => {
    return api.post('/categories/bulk-delete', { ids })
  },

  // Get category products
  getCategoryProducts: async (id, params) => {
    return api.get(`/categories/${id}/products`, { params })
  },

  // Upload category image
  uploadCategoryImage: async (id, file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post(`/categories/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Delete category image
  deleteCategoryImage: async (id) => {
    return api.delete(`/categories/${id}/image`)
  }
}

export default categoryService