import React from 'react'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi'

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'placed':
        return { color: 'bg-blue-100 text-blue-700', icon: FiClock, label: 'Order Placed' }
      case 'processing':
        return { color: 'bg-yellow-100 text-yellow-700', icon: FiPackage, label: 'Processing' }
      case 'shipped':
        return { color: 'bg-purple-100 text-purple-700', icon: FiTruck, label: 'Shipped' }
      case 'out_for_delivery':
        return { color: 'bg-orange-100 text-orange-700', icon: FiTruck, label: 'Out for Delivery' }
      case 'delivered':
        return { color: 'bg-green-100 text-green-700', icon: FiCheckCircle, label: 'Delivered' }
      case 'cancelled':
        return { color: 'bg-red-100 text-red-700', icon: FiXCircle, label: 'Cancelled' }
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: FiPackage, label: status }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  )
}

export default StatusBadge
