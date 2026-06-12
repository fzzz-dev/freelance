// src/components/checkout/ReviewStep.jsx
import React from 'react'
import { FiMapPin, FiCreditCard, FiPackage, FiCheckCircle } from 'react-icons/fi'

const ReviewStep = ({ address, paymentMethod, cart, onPlaceOrder, processing }) => {
  const subtotal = cart.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
  const discount = cart.discount || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = (subtotal - discount) * 0.1
  const total = subtotal - discount + shipping + tax

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FiPackage className="mr-2" />
          Order Items
        </h3>
        <div className="space-y-3">
          {cart.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FiMapPin className="mr-2" />
          Shipping Address
        </h3>
        <div className="space-y-1">
          <p className="font-medium">{address.fullName}</p>
          <p>{address.address}</p>
          <p>{address.city}, {address.state} {address.zipCode}</p>
          <p>{address.country}</p>
          <p className="text-gray-600">📞 {address.phone}</p>
          <p className="text-gray-600">✉️ {address.email}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FiCreditCard className="mr-2" />
          Payment Method
        </h3>
        <p className="capitalize">{paymentMethod.method}</p>
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-xl font-bold mb-4">Price Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-primary-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={processing}
          className="btn-primary w-full mt-6 flex items-center justify-center"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FiCheckCircle className="mr-2" />
              Place Order
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ReviewStep