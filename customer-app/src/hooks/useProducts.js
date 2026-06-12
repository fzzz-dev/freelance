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
    try {
      const response = await productService.getProducts({ ...initialFilters, ...filters })
      setProducts(response.data.items)
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, loading, error, pagination, fetchProducts }
}