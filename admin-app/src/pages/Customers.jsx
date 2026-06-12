import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { customerService } from '../services/api'
import CustomerTable from '../components/customer/CustomerTable'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [searchTerm])

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getCustomers({ search: searchTerm })
      setCustomers(response.data)
    } catch (error) {
      toast.error('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  const handleBlock = async (id) => {
    try {
      await customerService.blockCustomer(id)
      toast.success('Customer blocked')
      fetchCustomers()
    } catch (error) {
      toast.error('Failed to block customer')
    }
  }

  const handleUnblock = async (id) => {
    try {
      await customerService.unblockCustomer(id)
      toast.success('Customer unblocked')
      fetchCustomers()
    } catch (error) {
      toast.error('Failed to unblock customer')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
        />
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <CustomerTable customers={customers} onBlock={handleBlock} onUnblock={handleUnblock} />
      </div>
    </motion.div>
  )
}

export default Customers
