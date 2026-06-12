// src/components/dashboard/StatsGrid.jsx
import React from 'react'
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi'
import StatCard from './StatCard'

const StatsGrid = ({ stats }) => {
  const statCards = [
    { title: "Total Revenue", value: `$${stats?.revenue?.toLocaleString() || '0'}`, icon: FiDollarSign, color: "bg-green-500", trend: stats?.revenueTrend, trendUp: true },
    { title: "Total Orders", value: stats?.orders?.toLocaleString() || '0', icon: FiShoppingCart, color: "bg-blue-500", trend: stats?.ordersTrend, trendUp: true },
    { title: "Customers", value: stats?.customers?.toLocaleString() || '0', icon: FiUsers, color: "bg-purple-500", trend: stats?.customersTrend, trendUp: true },
    { title: "Products", value: stats?.products?.toLocaleString() || '0', icon: FiPackage, color: "bg-orange-500", trend: stats?.productsTrend, trendUp: false },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default StatsGrid