// src/pages/Wishlist.jsx
import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { wishlistService } from '../services/api'
import toast from 'react-hot-toast'

const Wishlist = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await wishlistService.getWishlist()
      setItems(response.data || response || [])
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
      // Fallback mock data
      setItems([
        { id: 1, title: 'Wireless Headphones', price: 99.99, image: 'https://picsum.photos/id/1/300/300', rating: 4.5 },
        { id: 2, title: 'Smart Watch Pro', price: 199.99, image: 'https://picsum.photos/id/2/300/300', rating: 4.8 },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistService.removeFromWishlist(productId)
      setItems(items.filter(item => item.id !== productId))
      toast.success('Removed from wishlist')
    } catch (error) {
      toast.error('Failed to remove from wishlist')
    }
  }

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1)
      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <FiHeart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
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
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all"
            >
              <Link to={`/product/${item.id}`}>
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={item.image || item.images?.[0] || 'https://picsum.photos/id/1/300/300'}
                    alt={item.title || item.name || 'Product'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://picsum.photos/id/1/300/300' }}
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                    {item.title || item.name}
                  </h3>
                </Link>
                
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    ${((item.discount || item.price) || 0).toFixed(2)}
                  </span>
                  {item.discount && (
                    <span className="text-sm text-gray-400 line-through">
                      ${(item.price || 0).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    <FiShoppingCart className="inline mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Wishlist