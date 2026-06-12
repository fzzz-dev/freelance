// src/components/product/ProductDetails.jsx
import React, { useState } from 'react'
import { FiMinus, FiPlus, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'

const ProductDetails = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0])

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const discountPercentage = product?.discount
    ? Math.round(((product.price - product.discount) / product.price) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Brand */}
      {product?.brand && (
        <p className="text-primary-600 font-semibold">{product.brand}</p>
      )}

      {/* Title */}
      <h1 className="text-3xl font-display font-bold text-gray-900">
        {product?.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product?.rating || 0)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {product?.rating} ({product?.reviewsCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold text-primary-600">
          ${(product?.discount || product?.price)?.toFixed(2)}
        </span>
        {product?.discount && (
          <>
            <span className="text-xl text-gray-400 line-through">
              ${product?.price?.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-semibold">
              -{discountPercentage}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{product?.description}</p>

      {/* Colors */}
      {product?.colors && product.colors.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-primary-600 ring-2 ring-primary-600/20'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product?.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-600 transition-colors"
          >
            <FiMinus />
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-600 transition-colors"
          >
            <FiPlus />
          </button>
          <span className="text-sm text-gray-500 ml-2">
            {product?.stock} items available
          </span>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        {product?.stock > 0 ? (
          <>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-green-600">In Stock</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-red-600">Out of Stock</span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onAddToCart(product?.id, quantity, { color: selectedColor, size: selectedSize })}
          disabled={product?.stock === 0}
          className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FiShoppingCart className="inline mr-2" />
          Add to Cart
        </button>
        <button
          onClick={() => onAddToWishlist(product?.id)}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Buy Now
        </button>
        <button
          onClick={() => onAddToWishlist(product?.id)}
          className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all"
        >
          <FiHeart className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ProductDetails