import React from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiUserX, FiUserCheck } from 'react-icons/fi'

const CustomerTable = ({ customers, onBlock, onUnblock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Orders</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Total Spent</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{customer.name?.charAt(0)}</span>
                  </div>
                  <span className="font-medium">{customer.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{customer.email}</td>
              <td className="px-4 py-3 text-sm">{customer.phone || '-'}</td>
              <td className="px-4 py-3 text-sm">{customer.totalOrders || 0}</td>
              <td className="px-4 py-3 text-sm font-semibold">${customer.totalSpent?.toFixed(2) || '0.00'}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  customer.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {customer.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Link to={`/customers/${customer.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FiEye className="w-4 h-4" />
                  </Link>
                  {customer.isBlocked ? (
                    <button onClick={() => onUnblock(customer.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <FiUserCheck className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={() => onBlock(customer.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <FiUserX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerTable
