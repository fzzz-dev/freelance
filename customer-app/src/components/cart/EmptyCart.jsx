// src/components/cart/EmptyCart.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi'

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full mb-6">
        <FiShoppingCart className="w-16 h-16 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet</p>
      <Link to="/" className="btn-primary inline-flex items-center">
        Start Shopping
        <FiArrowRight className="ml-2" />
      </Link>
      
      {/* Suggestions */}
      <div className="mt-12">
        <h3 className="font-semibold text-gray-800 mb-4">Popular Categories</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {["Electronics", "Fashion", "Home & Living", "Sports", "Books", "Toys"].map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default EmptyCart