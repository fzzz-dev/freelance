// src/components/user/UserMenu.jsx
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUser, FiPackage, FiHeart, FiMapPin, 
  FiCreditCard, FiBell, FiSettings, FiLogOut,
  FiChevronDown
} from 'react-icons/fi'
import { AuthContext } from '../../context/AuthContext'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const menuItems = [
    { icon: FiUser, label: "My Profile", link: "/profile" },
    { icon: FiPackage, label: "My Orders", link: "/profile/orders" },
    { icon: FiHeart, label: "Wishlist", link: "/wishlist" },
    { icon: FiMapPin, label: "Address Book", link: "/profile/addresses" },
    { icon: FiCreditCard, label: "Payment Methods", link: "/profile/payments" },
    { icon: FiBell, label: "Notifications", link: "/profile/notifications" },
    { icon: FiSettings, label: "Settings", link: "/profile/settings" },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:inline">Hello, {user.name?.split(' ')[0]}</span>
        <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-soft-lg overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 py-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu