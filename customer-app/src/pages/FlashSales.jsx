import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import { FiArrowLeft, FiZap } from 'react-icons/fi'

const FlashSales = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getFlashSales()
        setProducts(response.data || response)
      } catch (error) {
        console.error('Failed to fetch flash sales:', error)
        // Fallback mock data
        setProducts([
          { id: 10, name: 'Limited Edition Watch', price: 59.99, originalPrice: 199.99, image: 'https://picsum.photos/id/10/300/300', rating: 4.4, reviews: 234, isFlashSale: true },
          { id: 11, name: 'Flash Deal Headphones', price: 39.99, originalPrice: 89.99, image: 'https://picsum.photos/id/11/300/300', rating: 4.2, reviews: 89, isFlashSale: true },
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
        <FiZap className="text-3xl text-yellow-500" />
        <h1 className="text-3xl font-bold">Flash Sales</h1>
      </div>
      
      <p className="text-gray-600 mb-8">Limited time offers - Hurry up!</p>
      
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No flash sales at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)} 
              className="cursor-pointer"
            >
              <ProductCard product={product} isFlashSale={true} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default FlashSales