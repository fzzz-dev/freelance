// src/components/coupon/CouponForm.jsx
import React, { useState } from 'react'
import { FiSave, FiX } from 'react-icons/fi'

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    code: coupon?.code || '',
    discount: coupon?.discount || '',
    type: coupon?.type || 'percentage',
    validUntil: coupon?.validUntil || '',
    usageLimit: coupon?.usageLimit || '',
    ...coupon
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.code) newErrors.code = 'Coupon code is required'
    if (!formData.discount) newErrors.discount = 'Discount is required'
    if (formData.discount <= 0) newErrors.discount = 'Discount must be greater than 0'
    if (formData.type === 'percentage' && formData.discount > 100) newErrors.discount = 'Percentage cannot exceed 100%'
    if (!formData.validUntil) newErrors.validUntil = 'Valid until date is required'
    if (!formData.usageLimit) newErrors.usageLimit = 'Usage limit is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coupon Code *
        </label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.code ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., SUMMER2024"
          autoComplete="off"
        />
        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discount Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount ($)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discount Value *
        </label>
        <div className="relative">
          {formData.type === 'fixed' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          )}
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.discount ? 'border-red-500' : 'border-gray-300'
            } ${formData.type === 'fixed' ? 'pl-7' : ''}`}
            placeholder={formData.type === 'percentage' ? 'e.g., 20' : 'e.g., 10.99'}
            step={formData.type === 'percentage' ? '1' : '0.01'}
            min="0"
          />
        </div>
        {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valid Until *
        </label>
        <input
          type="date"
          name="validUntil"
          value={formData.validUntil}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.validUntil ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.validUntil && <p className="text-red-500 text-xs mt-1">{errors.validUntil}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usage Limit *
        </label>
        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.usageLimit ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 100"
          min="1"
        />
        {errors.usageLimit && <p className="text-red-500 text-xs mt-1">{errors.usageLimit}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
        >
          <FiX className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
        >
          <FiSave className="w-4 h-4" />
          <span>{coupon ? 'Update' : 'Create'} Coupon</span>
        </button>
      </div>
    </form>
  )
}

export default CouponForm