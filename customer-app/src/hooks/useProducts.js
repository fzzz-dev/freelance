// src/hooks/useProducts.js
import { useState, useEffect } from 'react'
import { productService } from '../services/api'

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  })

  const fetchProducts = async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await productService.getProducts({ ...initialFilters, ...filters })
      
      // Handle both response structures (array directly or { data: [] })
      const data = response.data || response
      
      // Check if data is an array or has items property
      if (Array.isArray(data)) {
        setProducts(data)
        setPagination({
          page: 1,
          totalPages: 1,
          totalItems: data.length
        })
      } else if (data.items && Array.isArray(data.items)) {
        setProducts(data.items)
        setPagination({
          page: data.page || 1,
          totalPages: data.totalPages || 1,
          totalItems: data.totalItems || data.items.length
        })
      } else {
        setProducts([])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    
    const loadProducts = async () => {
      if (!isMounted) return
      await fetchProducts()
    }
    
    loadProducts()
    
    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array means it runs once on mount

  return { products, loading, error, pagination, fetchProducts }
}