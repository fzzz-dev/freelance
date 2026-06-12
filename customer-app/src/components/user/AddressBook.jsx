// src/components/user/AddressBook.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AddressForm from './AddressForm'
// import { userService } from '../../services/api'

// Mock userService for UI development
const userService = {
  getAddresses: async () => ({ data: [] }),
  addAddress: async () => ({ data: { success: true } }),
  updateAddress: async () => ({ data: { success: true } }),
  deleteAddress: async () => ({ data: { success: true } }),
  setDefaultAddress: async () => ({ data: { success: true } })
}

const AddressBook = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await userService.getAddresses()
      setAddresses(response.data)
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAddress = async (addressData) => {
    try {
      if (editingAddress) {
        await userService.updateAddress(editingAddress.id, addressData)
        toast.success('Address updated successfully')
      } else {
        await userService.addAddress(addressData)
        toast.success('Address added successfully')
      }
      fetchAddresses()
      setShowForm(false)
      setEditingAddress(null)
    } catch (error) {
      toast.error('Failed to save address')
    }
  }

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await userService.deleteAddress(id)
        toast.success('Address deleted successfully')
        fetchAddresses()
      } catch (error) {
        toast.error('Failed to delete address')
      }
    }
  }

  const handleSetDefault = async (id) => {
    try {
      await userService.setDefaultAddress(id)
      toast.success('Default address updated')
      fetchAddresses()
    } catch (error) {
      toast.error('Failed to set default address')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading addresses...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Address Book</h2>
        <button
          onClick={() => {
            setEditingAddress(null)
            setShowForm(true)
          }}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <FiPlus />
          <span>Add New Address</span>
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <AddressForm
                initialData={editingAddress}
                onSubmit={handleSaveAddress}
                onCancel={() => {
                  setShowForm(false)
                  setEditingAddress(null)
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FiMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No addresses saved yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`bg-white border rounded-xl p-4 transition-all ${
                address.isDefault ? 'border-primary-600 bg-primary-50/10' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {address.isDefault && (
                    <span className="inline-block bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded mb-2">
                      Default Address
                    </span>
                  )}
                  <p className="font-semibold text-gray-800">{address.fullName}</p>
                  <p className="text-gray-600 mt-1">{address.address}</p>
                  {address.apartment && <p className="text-gray-600">{address.apartment}</p>}
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-gray-600">{address.country}</p>
                  <p className="text-gray-600 mt-2">📞 {address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingAddress(address)
                      setShowForm(true)
                    }}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddressBook