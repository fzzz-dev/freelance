import { useState, useEffect } from 'react'
import { analyticsService } from '../services/api'

export const useAdmin = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await analyticsService.getStats()
      setStats(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    fetchStats()
  }

  return { stats, loading, error, refreshData }
}
