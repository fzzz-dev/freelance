import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { productService } from '../services/api'

const Inventory = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts({ search: searchTerm })
      setProducts(response.data.items)
    } catch (error) {
      toast.error('Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  const updateStock = async (id, newStock) => {
    try {
      await productService.updateProduct(id, { stock: newStock })
      toast.success('Stock updated')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to update stock')
    }
  }

  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10)
  const outOfStockProducts = products.filter(p => p.stock === 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-soft p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Current Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Update Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img src={product.images?.[0] || '/api/placeholder/40/40'} className="w-10 h-10 rounded object-cover" />
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.sku}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock <= 10 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateStock(product.id, product.stock - 1)}
                        disabled={product.stock === 0}
                        className="w-8 h-8 border border-gray-300 rounded-lg disabled:opacity-50"
                      >-</button>
                      <span className="w-12 text-center">{product.stock}</span>
                      <button
                        onClick={() => updateStock(product.id, product.stock + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-lg"
                      >+</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default Inventory
