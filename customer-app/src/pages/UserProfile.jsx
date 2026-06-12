// src/pages/UserProfile.jsx
import React, { useState, useContext } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiUser, FiPackage, FiHeart, FiMapPin, 
  FiCreditCard, FiBell, FiSettings, FiLogOut 
} from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import ProfileInfo from '../components/user/ProfileInfo'
import OrderHistory from '../components/user/OrderHistory'
import AddressBook from '../components/user/AddressBook'

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()

  const menuItems = [
    { path: "/profile", name: "Profile Info", icon: FiUser, exact: true },
    { path: "/profile/orders", name: "My Orders", icon: FiPackage },
    { path: "/profile/wishlist", name: "Wishlist", icon: FiHeart },
    { path: "/profile/addresses", name: "Address Book", icon: FiMapPin },
    { path: "/profile/payments", name: "Payment Methods", icon: FiCreditCard },
    { path: "/profile/notifications", name: "Notifications", icon: FiBell },
    { path: "/profile/settings", name: "Settings", icon: FiSettings },
  ]

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden sticky top-32">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                {user?.phone && (
                  <p className="text-sm text-gray-500">{user.phone}</p>
                )}
              </div>
              
              <div className="p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                      isActive(item.path, item.exact)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-4"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <Routes>
                <Route path="/" element={<ProfileInfo />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:id" element={<div>Order Details Page</div>} />
                <Route path="/addresses" element={<AddressBook />} />
                <Route path="/payments" element={<div>Payment Methods Page</div>} />
                <Route path="/notifications" element={<div>Notifications Page</div>} />
                <Route path="/settings" element={<div>Settings Page</div>} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile