// src/components/common/Sidebar.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiTag, FiPackage, FiShoppingCart, FiUsers,
  FiBox, FiPercent, FiBarChart2, FiSettings, FiUser,
  FiLogOut, FiChevronLeft, FiChevronRight
} from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { logout } = useContext(AuthContext)

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: FiGrid },
    { path: "/categories", name: "Categories", icon: FiTag },
    { path: "/products", name: "Products", icon: FiPackage },
    { path: "/orders", name: "Orders", icon: FiShoppingCart },
    { path: "/customers", name: "Customers", icon: FiUsers },
    { path: "/inventory", name: "Inventory", icon: FiBox },
    { path: "/coupons", name: "Coupons", icon: FiPercent },
    { path: "/analytics", name: "Analytics", icon: FiBarChart2 },
    { path: "/settings", name: "Settings", icon: FiSettings },
    { path: "/profile", name: "Profile", icon: FiUser },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="bg-white shadow-soft-lg relative z-10"
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          {!collapsed ? (
         <h1 className="text-xl font-bold text-white bg-blue-600 px-4 py-2 rounded-lg">
  Admin Panel
</h1>
          ) : (
            <h1 className="text-xl font-bold text-primary-600">A</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 mx-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-primary-600 transition-colors"
        >
          {collapsed ? (
            <FiChevronRight className="w-3 h-3" />
          ) : (
            <FiChevronLeft className="w-3 h-3" />
          )}
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar