// src/components/cart/PriceSummary.jsx
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

const PriceSummary = () => {
  const { cart, applyCoupon } = useContext(CartContext)
  const [couponCode, setCouponCode] = useState('')
  const [applying, setApplying] = useState(false)

  const subtotal = cart.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
  const discount = cart.discount || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = (subtotal - discount) * 0.1
  const total = subtotal - discount + shipping + tax

  const handleApplyCoupon = async () => {
    if (!couponCode) return
    setApplying(true)
    try {
      await applyCoupon(couponCode)
      toast.success('Coupon applied successfully!')
      setCouponCode('')
    } catch (error) {
      toast.error('Invalid coupon code')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      {/* Coupon Input */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={applying}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mt-4 text-sm text-gray-500">
        {subtotal < 50 && (
          <p>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
        )}
      </div>
    </div>
  )
}

export default PriceSummary