import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { productService, categoryService } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import { FiArrowLeft } from 'react-icons/fi'

const CategoryPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])  // Always initialize as array
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  // Category name mapping
  const categoryNames = {
    'electronics': 'Electronics',
    'fashion': 'Fashion',
    'home': 'Home & Living',
    'gaming': 'Gaming',
    'todays-deals': "Today's Deals",
    'new-arrivals': 'New Arrivals',
    'best-sellers': 'Best Sellers',
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setProducts([])  // Reset products when category changes
      
      try {
        let productsData = []
        
        // Try to fetch products for this category
        try {
          const productsRes = await productService.getProducts({ category: id, limit: 100 })
          // Safely extract products array
          if (productsRes && productsRes.data) {
            productsData = Array.isArray(productsRes.data) ? productsRes.data : []
          } else if (Array.isArray(productsRes)) {
            productsData = productsRes
          } else {
            productsData = []
          }
        } catch (err) {
          console.log('getProducts failed, using fallback')
        }
        
        // If no products, try to get from specific category endpoints
        if (productsData.length === 0) {
          try {
            const featuredRes = await productService.getFeatured()
            const allProducts = featuredRes?.data || featuredRes || []
            productsData = Array.isArray(allProducts) ? allProducts.slice(0, 12) : []
          } catch (err) {
            console.log('Featured fetch failed')
          }
        }
        
        // Ensure productsData is always an array
        setProducts(Array.isArray(productsData) ? productsData : [])
        
        // Set category name
        setCategory({
          name: categoryNames[id] || (id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Category'),
          description: `Browse all products in ${categoryNames[id] || id || 'this category'}`
        })
        
        // Try to fetch category details (optional)
        try {
          const categoryRes = await categoryService.getCategory(id)
          if (categoryRes && (categoryRes.data || categoryRes)) {
            const catData = categoryRes.data || categoryRes
            if (catData && typeof catData === 'object') {
              setCategory(prev => ({ ...prev, ...catData }))
            }
          }
        } catch (err) {
          console.log('Category service not available')
        }
        
      } catch (error) {
        console.error('Failed to fetch category data:', error)
        // Fallback mock products as array
        setProducts([
          { id: 1, name: 'Sample Product 1', price: 99.99, image: 'https://picsum.photos/id/1/300/300', rating: 4.5 },
          { id: 2, name: 'Sample Product 2', price: 149.99, image: 'https://picsum.photos/id/2/300/300', rating: 4.8 },
          { id: 3, name: 'Sample Product 3', price: 79.99, image: 'https://picsum.photos/id/3/300/300', rating: 4.3 },
        ])
        setCategory({
          name: categoryNames[id] || 'Category',
          description: 'Products in this category'
        })
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Safely check if products is an array and has items
  const hasProducts = Array.isArray(products) && products.length > 0

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
      
      <h1 className="text-3xl font-bold mb-2">{category?.name || 'Category'}</h1>
      <p className="text-gray-600 mb-8">{category?.description || 'Browse all products in this category'}</p>
      
      {!hasProducts ? (
        <div className="text-center py-12 text-gray-500">No products in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product?.id || Math.random()} 
              onClick={() => navigate(`/product/${product?.id}`)} 
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

export default CategoryPage