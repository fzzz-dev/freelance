import React from 'react'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

const CategoryList = ({ categories, onEdit, onDelete, onAddSubcategory }) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-soft transition-all">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              {category.image && (
                <img src={category.image} alt={category.name} className="w-12 h-12 rounded-lg object-cover" />
              )}
              {category.icon && <span className="text-2xl">{category.icon}</span>}
              <div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-500">{category.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">ID: {category.id}</p>
              </div>
            </div>
            <div className="flex space-x-2">
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
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {category.children && category.children.length > 0 && (
            <div className="ml-8 mt-3 pl-4 border-l-2 border-gray-200">
              <CategoryList
                categories={category.children}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddSubcategory={onAddSubcategory}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CategoryList
