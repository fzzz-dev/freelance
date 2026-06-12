// src/components/product/RelatedProducts.jsx
import React, { useState, useEffect } from 'react'
import ProductCard from '../common/ProductCard'
import { productService } from '../../services/api'

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedProducts()
  }, [categoryId, currentProductId])

  const fetchRelatedProducts = async () => {
    try {
      const response = await productService.getCategoryProducts(categoryId)
      const filtered = response.data.filter(p => p.id !== currentProductId).slice(0, 4)
      setProducts(filtered)
    } catch (error) {
      console.error('Failed to fetch related products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || products.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts