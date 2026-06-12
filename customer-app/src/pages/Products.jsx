import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get all products from different categories
        const [featured, trending, newArrivals, flashSales] = await Promise.all([
          productService.getFeatured(),
          productService.getTrending(),
          productService.getNewArrivals(),
          productService.getFlashSales(),
        ])
        
        const allProducts = [
          ...(featured.data || featured || []),
          ...(trending.data || trending || []),
          ...(newArrivals.data || newArrivals || []),
          ...(flashSales.data || flashSales || []),
        ]
        
        setProducts(allProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Fallback mock products
        setProducts([
          { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://picsum.photos/id/1/300/300', rating: 4.5 },
          { id: 2, name: 'Smart Watch Pro', price: 199.99, image: 'https://picsum.photos/id/2/300/300', rating: 4.8 },
          { id: 3, name: 'Premium Backpack', price: 79.99, image: 'https://picsum.photos/id/3/300/300', rating: 4.3 },
          { id: 4, name: 'Noise Cancelling Earbuds', price: 149.99, image: 'https://picsum.photos/id/4/300/300', rating: 4.7 },
          { id: 5, name: 'Gaming Keyboard', price: 129.99, image: 'https://picsum.photos/id/5/300/300', rating: 4.9 },
          { id: 6, name: 'Wireless Mouse', price: 49.99, image: 'https://picsum.photos/id/6/300/300', rating: 4.6 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      
      <div className="relative mb-8">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

export default Products