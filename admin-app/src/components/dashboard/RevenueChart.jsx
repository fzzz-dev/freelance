// src/components/dashboard/RevenueChart.jsx
import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area
} from 'recharts'
import { analyticsService } from '../../services/analyticsService'
import { FiCalendar, FiDownload } from 'react-icons/fi'
import toast from 'react-hot-toast'

const RevenueChart = ({ title, period = 'monthly' }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(period)

  useEffect(() => {
    fetchRevenueData()
  }, [selectedPeriod])

  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      const response = await analyticsService.getRevenueAnalytics(selectedPeriod)
      setData(response.data)
    } catch (error) {
      console.error('Failed to fetch revenue data:', error)
      toast.error('Failed to load revenue chart')
      // Fallback demo data
      setData([
        { month: 'Jan', revenue: 12500, profit: 3750, orders: 145 },
        { month: 'Feb', revenue: 15200, profit: 4560, orders: 178 },
        { month: 'Mar', revenue: 18900, profit: 5670, orders: 210 },
        { month: 'Apr', revenue: 16800, profit: 5040, orders: 195 },
        { month: 'May', revenue: 22100, profit: 6630, orders: 245 },
        { month: 'Jun', revenue: 24500, profit: 7350, orders: 278 },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await analyticsService.exportReport('revenue', 'csv')
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `revenue-report-${new Date().toISOString()}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Report exported successfully')
    } catch (error) {
      toast.error('Failed to export report')
    }
  }

  const periods = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-soft-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => setSelectedPeriod(p.value)}
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  selectedPeriod === p.value
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Export Data"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey={selectedPeriod === 'weekly' ? 'day' : selectedPeriod === 'monthly' ? 'month' : 'quarter'} 
            stroke="#9ca3af"
          />
          <YAxis 
            stroke="#9ca3af"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#3b82f6"
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="profit"
            name="Profit"
            stroke="#10b981"
            fill="url(#colorProfit)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-primary-600">
            ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Profit</p>
          <p className="text-xl font-bold text-green-600">
            ${data.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-orange-600">
            {data.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RevenueChart