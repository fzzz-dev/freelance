// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiDollarSign, FiShoppingCart, FiUsers, FiPackage,
  FiTrendingUp, FiTrendingDown
} from 'react-icons/fi'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { analyticsService } from '../services/api'
import StatCard from '../components/dashboard/StatCard'
import SalesChart from '../components/dashboard/SalesChart'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0
  })
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsData, salesDataResponse] = await Promise.all([
        analyticsService.getStats(),
        analyticsService.getSalesAnalytics()
      ])
      setStats(statsData.data)
      setSalesData(salesDataResponse.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "bg-green-500",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Total Orders",
      value: stats.orders.toLocaleString(),
      icon: FiShoppingCart,
      color: "bg-blue-500",
      trend: "+8.2%",
      trendUp: true
    },
    {
      title: "Customers",
      value: stats.customers.toLocaleString(),
      icon: FiUsers,
      color: "bg-purple-500",
      trend: "+15.3%",
      trendUp: true
    },
    {
      title: "Products",
      value: stats.products.toLocaleString(),
      icon: FiPackage,
      color: "bg-orange-500",
      trend: "-2.1%",
      trendUp: false
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Order rows would be populated from API */}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard