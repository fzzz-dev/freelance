// src/components/cart/CartItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiHeart, FiMinus, FiPlus } from 'react-icons/fi'

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-soft p-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <Link to={`/product/${item.productId}`} className="flex-shrink-0">
          <img
            src={item.image || '/api/placeholder/120/120'}
            alt={item.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-grow">
          <Link to={`/product/${item.productId}`}>
            <h3 className="font-semibold text-gray-800 hover:text-primary-600 mb-1">
              {item.title}
            </h3>
          </Link>
          {item.brand && <p className="text-sm text-gray-500 mb-2">{item.brand}</p>}
          
          {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
          {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}

          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-lg font-bold text-primary-600">
              ${item.price.toFixed(2)}
            </span>
            {item.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-600"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-600"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => onSaveForLater(item.id)}
              className="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <FiHeart className="w-5 h-5" />
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem