// src/components/category/CategoryTree.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronRight, FiChevronDown, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

const CategoryTree = ({ categories, onEdit, onDelete, onAddSubcategory }) => {
  const [expanded, setExpanded] = useState(new Set())

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpanded(newExpanded)
  }

  const renderCategory = (category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expanded.has(category.id)

    return (
      <div key={category.id} style={{ marginLeft: level * 24 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between p-3 bg-white rounded-lg mb-2 hover:shadow-soft transition-all group"
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren && (
              <button
                onClick={() => toggleExpand(category.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {isExpanded ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
              </button>
            )}
            {category.image && (
              <img src={category.image} alt={category.name} className="w-8 h-8 rounded-lg object-cover" />
            )}
            {category.icon && <span className="text-xl">{category.icon}</span>}
            <div>
              <span className="font-medium text-gray-800">{category.name}</span>
              {category.description && (
                <p className="text-xs text-gray-500">{category.description}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onAddSubcategory(category)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Add Subcategory"
            >
              <FiPlus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(category)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4"
            >
              {category.children.map(child => renderCategory(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {categories.map(category => renderCategory(category))}
    </div>
  )
}

export default CategoryTree