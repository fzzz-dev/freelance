// src/components/user/OrderCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPackage, FiTruck, FiCheckCircle, FiEye } from 'react-icons/fi'

const OrderCard = ({ order }) => {
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

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FiCheckCircle className="w-4 h-4" />
      case 'shipped': return <FiTruck className="w-4 h-4" />
      default: return <FiPackage className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-soft-lg transition-all"
    >
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="flex space-x-3 mb-4">
        {order.items?.slice(0, 3).map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ))}
        {order.items?.length > 3 && (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-600">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{order.items?.length} item(s)</p>
          <p className="text-lg font-bold text-primary-600">${order.total?.toFixed(2)}</p>
        </div>
        <Link
          to={`/profile/orders/${order.id}`}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
        >
          <span>View Details</span>
          <FiEye className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}

export default OrderCard