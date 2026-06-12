import React from 'react'
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiShoppingBag, FiDollarSign } from 'react-icons/fi'

const CustomerDetail = ({ customer }) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{customer.name?.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            <p className="text-gray-500">Customer since {new Date(customer.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <FiMail className="w-5 h-5 text-gray-400" />
            <span>{customer.email}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center space-x-3">
              <FiPhone className="w-5 h-5 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <FiCalendar className="w-5 h-5 text-gray-400" />
            <span>Joined on {new Date(customer.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Addresses */}
      {customer.addresses && customer.addresses.length > 0 && (
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FiMapPin className="mr-2" />
            Saved Addresses
          </h3>
          <div className="space-y-3">
            {customer.addresses.map((address, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-sm text-gray-600">{address.country}</p>
                <p className="text-sm text-gray-600">📞 {address.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-soft p-4 text-center">
          <FiShoppingBag className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">{customer.totalOrders || 0}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-4 text-center">
          <FiDollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">${customer.totalSpent?.toFixed(2) || '0.00'}</p>
          <p className="text-sm text-gray-500">Total Spent</p>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail
