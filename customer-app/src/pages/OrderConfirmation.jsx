// src/pages/OrderConfirmation.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiCreditCard } from 'react-icons/fi'
import { orderService } from '../services/api'

const OrderConfirmation = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrder(id)
      setOrder(response.data || response)
    } catch (error) {
      console.error('Failed to fetch order:', error)
      // Fallback mock order for demo
      setOrder({
        id: id,
        items: [
          { id: 1, title: 'Sample Product', price: 99.99, quantity: 2, image: 'https://picsum.photos/id/1/100/100' }
        ],
        subtotal: 199.98,
        shipping: 0,
        tax: 0,
        total: 199.98,
        shippingAddress: {
          fullName: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: { method: 'credit_card' },
        status: 'placed'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-20 text-center">
        <p className="text-gray-600">Order not found</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
          Go back home
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-sm text-gray-500 mt-2">Order ID: {order.id}</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div key={item.id || index} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.image || 'https://picsum.photos/id/1/100/100'} 
                    alt={item.title || item.name || 'Product'} 
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => { e.target.src = 'https://picsum.photos/id/1/100/100' }}
                  />
                  <div>
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{(order.shipping === 0 || order.shipping === undefined) ? 'Free' : `$${(order.shipping || 0).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(order.tax || 0).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-600">${(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <FiMapPin className="mr-2" />
              Shipping Address
            </h3>
            <div className="text-sm space-y-1">
              <p>{order.shippingAddress?.fullName || 'N/A'}</p>
              <p>{order.shippingAddress?.address || 'N/A'}</p>
              <p>
                {order.shippingAddress?.city || ''} 
                {order.shippingAddress?.state ? `, ${order.shippingAddress.state}` : ''} 
                {order.shippingAddress?.zipCode ? ` ${order.shippingAddress.zipCode}` : ''}
              </p>
              <p>{order.shippingAddress?.country || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <FiCreditCard className="mr-2" />
              Payment Method
            </h3>
            <p className="text-sm capitalize">{order.paymentMethod?.method || 'Not specified'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link 
            to={`/tracking/${order.id}`} 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            <FiTruck className="mr-2" />
            Track Order
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderConfirmation