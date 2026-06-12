// src/components/common/Navbar.jsx
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, FiShoppingCart, FiUser, FiHeart, FiBell, 
  FiGlobe, FiMapPin, FiMenu, FiChevronDown, FiLogOut,
  FiSettings, FiPackage, FiList, FiX
} from 'react-icons/fi'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import SearchBar from './SearchBar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false) // Renamed for clarity
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    { name: "Flash Sales", href: "/flash-sales" },
    { name: "Featured", href: "/featured" },
    { name: "Trending", href: "/trending" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Home & Living", href: "/category/home" },
    { name: "Gaming", href: "/category/gaming" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-700"
        >
          <FiMenu size={24} />
        </button>
        
        <Link to="/">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            ShopHub
          </h1>
        </Link>
        
        <Link to="/cart" className="relative p-2">
          <FiShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-xl"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {!user && (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-gray-100 text-gray-700 text-center px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">
                      Register
                    </Link>
                  </div>
                )}
                <div className="space-y-2">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Home</Link>
                  <Link to="/featured" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Featured</Link>
                  <Link to="/trending" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Trending</Link>
                  <Link to="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">New Arrivals</Link>
                  <Link to="/flash-sales" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Flash Sales</Link>
                  <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Wishlist</Link>
                </div>
                
                {/* Categories section in mobile menu */}
                <div className="pt-4 border-t">
                  <p className="font-semibold text-gray-800 mb-2">Categories</p>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-gray-600 hover:text-blue-600 pl-2"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {user && (
                  <div className="pt-4 border-t">
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-600 py-2 block w-full text-left">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:block">
        {/* Top Bar */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiMapPin className="w-4 h-4" />
                  <span className="hover:text-blue-600 cursor-pointer">Deliver to</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiGlobe className="w-4 h-4" />
                  <span className="hover:text-blue-600 cursor-pointer">English (USD)</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
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
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50"
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
                          <button onClick={logout} className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-red-600">
                            <FiLogOut /> <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                    <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                ShopHub
              </h1>
            </Link>
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-blue-600">
                <FiHeart className="w-6 h-6" />
              </Link>
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <FiBell className="w-6 h-6" />
              </button>
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
                <FiShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Bar - Hamburger Button only */}
        <div className="border-t border-gray-100 bg-gray-50/30">
          <div className="container mx-auto px-4">
            <div className="py-2">
              {/* Hamburger Button - Click to show categories */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  onMouseEnter={() => setShowCategoriesDropdown(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 border border-gray-200"
                >
                  <FiMenu className="w-5 h-5" />
                  <span className="font-medium">All Categories</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Categories Dropdown - Shows only when hamburger is clicked/hovered */}
                <AnimatePresence>
                  {showCategoriesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setShowCategoriesDropdown(true)}
                      onMouseLeave={() => setShowCategoriesDropdown(false)}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            onClick={() => setShowCategoriesDropdown(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar