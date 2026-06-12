// src/pages/Cart.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiHeart, FiShoppingCart, FiChevronRight } from 'react-icons/fi'
import { CartContext } from '../context/CartContext'
import PriceSummary from '../components/cart/PriceSummary'

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useContext(CartContext)

  // Safe check for cart and items
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                    <img
                      src={item.image || 'https://picsum.photos/id/1/120/120'}
                      alt={item.title || 'Product'}
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => { e.target.src = 'https://picsum.photos/id/1/120/120' }}
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-blue-600 mb-1">
                        {item.title || item.name}
                      </h3>
                    </Link>
                    {item.brand && (
                      <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    )}
                    
                    {/* Variants */}
                    {item.color && (
                      <p className="text-sm text-gray-600">Color: {item.color}</p>
                    )}
                    {item.size && (
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${(item.price || 0).toFixed(2)}
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
                        onClick={() => updateQuantity && updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity || 0}</span>
                      <button
                        onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <FiHeart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removeItem && removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <PriceSummary />
            <Link
              to="/checkout"
              className="block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all text-center mt-4"
            >
              Proceed to Checkout
              <FiChevronRight className="inline ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart