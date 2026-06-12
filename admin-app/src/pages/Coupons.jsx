// src/pages/Coupons.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Modal from '../components/common/Modal'  // ADD THIS
import CouponForm from '../components/common/CouponForm'  // ADD THIS - you'll need to create it

const Coupons = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      // API call placeholder
      setCoupons([
        { id: 1, code: 'SAVE20', discount: 20, type: 'percentage', validUntil: '2024-12-31', usageLimit: 100, used: 45 },
        { id: 2, code: 'FREESHIP', discount: 5.99, type: 'fixed', validUntil: '2024-11-30', usageLimit: 50, used: 23 },
      ])
    } catch (error) {
      toast.error('Failed to load coupons')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCoupon = async (couponData) => {
    try {
      if (editingCoupon) {
        // API update call placeholder
        toast.success('Coupon updated successfully')
      } else {
        // API create call placeholder
        toast.success('Coupon created successfully')
      }
      fetchCoupons()
      setShowModal(false)
      setEditingCoupon(null)
    } catch (error) {
      toast.error('Failed to save coupon')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        // API call placeholder
        toast.success('Coupon deleted')
        fetchCoupons()
      } catch (error) {
        toast.error('Failed to delete coupon')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Loading coupons...</div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <button 
          onClick={() => {
            setEditingCoupon(null)
            setShowModal(true)
          }} 
          className="btn-primary flex items-center justify-center space-x-2 px-4 py-2 whitespace-nowrap"
        >
          <FiPlus className="w-4 h-4" /> 
          <span>Add Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {coupons.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No coupons yet. Click "Add Coupon" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Discount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Valid Until</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded text-sm">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${coupon.type === 'percentage' ? 'text-green-600' : 'text-blue-600'}`}>
                        {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(coupon.validUntil).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-green-600 rounded-full h-2" 
                            style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {coupon.used} / {coupon.usageLimit}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => { 
                            setEditingCoupon(coupon)
                            setShowModal(true) 
                          }} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit coupon"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(coupon.id)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete coupon"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD THE MODAL - This was missing! */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingCoupon(null)
        }}
        title={editingCoupon ? "Edit Coupon" : "Add New Coupon"}
        size="md"
      >
        <CouponForm
          coupon={editingCoupon}
          onSubmit={handleSaveCoupon}
          onCancel={() => {
            setShowModal(false)
            setEditingCoupon(null)
          }}
        />
      </Modal>
    </motion.div>
  )
}

export default Coupons