// src/components/order/OrderTable.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

const OrderTable = ({ orders, onStatusChange }) => {
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

  const statusOptions = [
    'placed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-sm">#{order.id}</td>
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{order.customer?.name}</p>
                  <p className="text-xs text-gray-500">{order.customer?.email}</p>
                </div>
              </td>
              <td className="px-4 py-3 font-semibold">${order.total?.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm">{order.items?.length || 0} items</td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)} border-0 cursor-pointer`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status} className="text-gray-800">
                      {status.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/orders/${order.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                >
                  <FiEye className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable