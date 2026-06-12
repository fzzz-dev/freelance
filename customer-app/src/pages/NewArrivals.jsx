import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import { FiArrowLeft, FiClock } from 'react-icons/fi'

const NewArrivals = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getNewArrivals()
        setProducts(response.data)
      } catch (error) {
        console.error('Failed to fetch new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 container-custom">
      <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6">
        <FiArrowLeft /> <span>Back</span>
      </button>
      <div className="flex items-center space-x-3 mb-2">
        <FiClock className="text-3xl text-green-500" />
        <h1 className="text-3xl font-bold">New Arrivals</h1>
      </div>
      <p className="text-gray-600 mb-8">Fresh from the brands</p>
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No new arrivals at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} onClick={() => navigate(/product/)} className="cursor-pointer">
              <ProductCard product={product} isNew={true} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default NewArrivals
