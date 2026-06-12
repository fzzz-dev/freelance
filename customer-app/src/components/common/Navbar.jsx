// src/components/common/Navbar.jsx
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, FiShoppingCart, FiUser, FiHeart, FiBell, 
  FiGlobe, FiMapPin, FiMenu, FiChevronDown, FiLogOut,
  FiSettings, FiPackage, FiList
} from 'react-icons/fi'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import SearchBar from './SearchBar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const categories = [
    { name: "Today's Deals", href: "/deals" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "Offers", href: "/offers" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Home & Living", href: "/category/home" },
    { name: "Gaming", href: "/category/gaming" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-soft' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container-custom py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <FiMapPin className="w-4 h-4" />
                <span className="hover:text-primary-600 cursor-pointer">Deliver to</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiGlobe className="w-4 h-4" />
                <span className="hover:text-primary-600 cursor-pointer">English (USD)</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                  >
                    <span>Hello, {user.name}</span>
                    <FiChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft-lg overflow-hidden"
                      >
                        <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                          <FiUser /> <span>My Profile</span>
                        </Link>
                        <Link to="/profile/orders" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                          <FiPackage /> <span>My Orders</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                          <FiHeart /> <span>Wishlist</span>
                        </Link>
                        <Link to="/profile/settings" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                          <FiSettings /> <span>Settings</span>
                        </Link>
                        <button onClick={logout} className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-red-600">
                          <FiLogOut /> <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link>
                  <Link to="/register" className="text-gray-600 hover:text-primary-600">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-custom py-4">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FiHeart className="w-6 h-6" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FiShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-gray-100">
        <div className="container-custom">
          <div className="flex items-center space-x-6 py-2 overflow-x-auto scrollbar-hide">
            <button
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 whitespace-nowrap"
            >
              <FiMenu className="w-5 h-5" />
              <span>Categories</span>
              <FiChevronDown className="w-4 h-4" />
            </button>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-gray-700 hover:text-primary-600 whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Dropdown */}
      <AnimatePresence>
        {showCategories && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            className="absolute top-full left-0 w-full glass shadow-soft-lg"
          >
            <div className="container-custom py-6">
              <div className="grid grid-cols-4 gap-8">
                {/* Category sections would be populated from API */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar