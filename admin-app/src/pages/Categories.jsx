// src/pages/Categories.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiChevronRight, FiChevronDown } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { categoryService } from '../services/api'
import Modal from '../components/common/Modal'
import CategoryForm from '../components/category/CategoryForm'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState(new Set())

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories()
      setCategories(response.data)
    } catch (error) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, categoryData)
        toast.success('Category updated successfully')
      } else {
        await categoryService.createCategory(categoryData)
        toast.success('Category created successfully')
      }
      fetchCategories()
      setShowModal(false)
      setEditingCategory(null)
    } catch (error) {
      toast.error('Failed to save category')
    }
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id)
        toast.success('Category deleted successfully')
        fetchCategories()
      } catch (error) {
        toast.error('Failed to delete category')
      }
    }
  }

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  // FIXED: Better tree rendering with CSS-based indentation instead of inline styles
  const renderCategoryTree = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category.id}>
        <div 
          className="category-item"
          style={{ 
            '--level': level,
            paddingLeft: `calc(${level} * 1.5rem)`
          }}
        >
          <div className="flex items-center justify-between p-3 bg-white rounded-lg mb-2 hover:shadow-soft transition-shadow w-full">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Fixed: Chevron button alignment */}
              <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                {category.children && category.children.length > 0 && (
                  <button 
                    onClick={() => toggleExpand(category.id)}
                    className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                  >
                    {expandedCategories.has(category.id) ? (
                      <FiChevronDown className="w-4 h-4" />
                    ) : (
                      <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              
              {/* Fixed: Image alignment */}
              {category.image && (
                <div className="flex-shrink-0">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-8 h-8 rounded-lg object-cover" 
                  />
                </div>
              )}
              
              {/* Fixed: Text alignment and overflow */}
              <div className="flex-1 min-w-0">
                <span className="font-medium block truncate">{category.name}</span>
                {category.description && (
                  <p className="text-sm text-gray-500 truncate">{category.description}</p>
                )}
              </div>
            </div>
            
            {/* Fixed: Action buttons alignment */}
            <div className="flex items-center space-x-1 flex-shrink-0 ml-4">
              <button
                onClick={() => {
                  setEditingCategory(category)
                  setShowModal(true)
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit category"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete category"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {expandedCategories.has(category.id) && category.children && (
          <div className="category-children">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 min-h-[400px]">
        <div className="text-gray-500">Loading categories...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={() => {
            setEditingCategory(null)
            setShowModal(true)
          }}
          className="btn-primary flex items-center justify-center space-x-2 px-4 py-2 whitespace-nowrap"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6">
        {categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No categories yet. Click "Add Category" to create one.
          </div>
        ) : (
          renderCategoryTree(categories)
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingCategory(null)
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <CategoryForm
          category={editingCategory}
          parentCategories={categories}
          onSubmit={handleSaveCategory}
          onCancel={() => {
            setShowModal(false)
            setEditingCategory(null)
          }}
        />
      </Modal>
    </motion.div>
  )
}

export default Categories