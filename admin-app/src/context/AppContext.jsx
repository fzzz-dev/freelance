// src/context/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { analyticsService } from '../services/analyticsService'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchNotifications()
  }, [])

  const fetchStats = async () => {
  setStats({
    totalUsers: 1247,
    totalOrders: 3456,
    totalRevenue: 124567,
    totalProducts: 89
  });
};

  const fetchNotifications = async () => {
    // API placeholder
    setNotifications([
      { id: 1, message: 'New order received', type: 'order', read: false, time: new Date() },
      { id: 2, message: 'Low stock alert', type: 'inventory', read: false, time: new Date() },
    ])
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('adminTheme', newTheme)
  }

  return (
    <AppContext.Provider value={{
      sidebarCollapsed,
      toggleSidebar,
      theme,
      toggleTheme,
      notifications,
      markNotificationAsRead,
      clearNotifications,
      stats,
      loading,
      refreshStats: fetchStats
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext