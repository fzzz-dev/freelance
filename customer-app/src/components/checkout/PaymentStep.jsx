// src/components/checkout/PaymentStep.jsx
import React, { useState } from 'react'
import { FiCreditCard, FiSmartphone, FiHome, FiCheckCircle } from 'react-icons/fi'

const PaymentStep = ({ onSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FiCreditCard },
    { id: 'upi', name: 'UPI', icon: FiSmartphone },
    { id: 'cod', name: 'Cash on Delivery', icon: FiHome }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ method: selectedMethod, details: cardDetails })
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="mr-3"
            />
            <method.icon className="w-5 h-5 mr-3 text-gray-600" />
            <span className="font-medium">{method.name}</span>
          </label>
        ))}
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Continue to Review
          </button>
        </form>
      )}

      {selectedMethod === 'upi' && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">UPI ID</label>
            <input
              type="text"
              placeholder="username@bank"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-4">
            Continue to Review
          </button>
        </form>
      )}

      {selectedMethod === 'cod' && (
        <form onSubmit={handleSubmit}>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              Pay with cash when your order arrives. Please ensure you have the exact amount ready.
            </p>
          </div>
          <button type="submit" className="btn-primary w-full">
            Continue to Review
          </button>
        </form>
      )}
    </div>
  )
}

export default PaymentStep