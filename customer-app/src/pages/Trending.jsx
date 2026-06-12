import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import { FiArrowLeft, FiTrendingUp } from 'react-icons/fi'

const Trending = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getTrending()
        setProducts(response.data || response)
      } catch (error) {
        console.error('Failed to fetch trending products:', error)
        // Fallback mock data
        setProducts([
          { id: 5, name: 'Gaming Keyboard', price: 129.99, image: 'https://picsum.photos/id/5/300/300', rating: 4.9, reviews: 312 },
          { id: 6, name: 'Wireless Mouse', price: 49.99, image: 'https://picsum.photos/id/6/300/300', rating: 4.6, reviews: 178 },
          { id: 7, name: '4K Monitor', price: 349.99, image: 'https://picsum.photos/id/7/300/300', rating: 4.8, reviews: 95 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-20 container mx-auto px-4"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6"
      >
        <FiArrowLeft /> <span>Back</span>
      </button>
      
      <div className="flex items-center space-x-3 mb-2">
        <FiTrendingUp className="text-3xl text-orange-500" />
        <h1 className="text-3xl font-bold">Trending Now</h1>
      </div>
      
      <p className="text-gray-600 mb-8">Most popular products this week</p>
      
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No trending products available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)} 
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Trending