// src/components/common/ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi'

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discountPercentage = product.discount 
    ? Math.round(((product.price - product.discount) / product.price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
          -{discountPercentage}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => onAddToWishlist(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.images?.[0] || '/api/placeholder/400/400'}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviewsCount || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-xl font-bold text-primary-600">
            ${(product.discount || product.price).toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock > 0 ? (
          <p className="text-xs text-green-600 mb-2">In Stock</p>
        ) : (
          <p className="text-xs text-red-600 mb-2">Out of Stock</p>
        )}

        {/* Delivery Estimate */}
        <p className="text-xs text-gray-500 mb-3">
          Delivery by {product.deliveryEstimate || '3-5 business days'}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FiShoppingCart className="inline mr-2" />
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            <FiEye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Floating Action Buttons on Hover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        className="absolute bottom-20 left-0 right-0 flex justify-center space-x-2 px-4"
      >
        <button className="px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300">
          Quick View
        </button>
      </motion.div>
    </motion.div>
  )
}

export default ProductCard