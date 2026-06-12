// src/components/user/OrderHistory.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPackage, FiEye } from 'react-icons/fi'
import { orderService } from '../../services/api'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'placed': 'bg-blue-100 text-blue-700',
      'processing': 'bg-yellow-100 text-yellow-700',
      'shipped': 'bg-purple-100 text-purple-700',
      'out_for_delivery': 'bg-orange-100 text-orange-700',
      'delivered': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">When you place an order, it will appear here</p>
        <Link to="/" className="text-primary-600 hover:underline">
          Start Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-4 hover:shadow-soft transition-all"
          >
            <div className="flex flex-wrap justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status?.replace('_', ' ').toUpperCase()}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-600">
                  {order.items?.length} item(s)
                </p>
                <p className="text-lg font-bold text-primary-600">
                  ${order.total?.toFixed(2)}
                </p>
              </div>
              <Link
                to={`/profile/orders/${order.id}`}
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
              >
                <span>View Details</span>
                <FiEye className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory