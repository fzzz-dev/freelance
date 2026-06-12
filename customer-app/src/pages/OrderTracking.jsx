// src/pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiCheck } from 'react-icons/fi'
import { orderService } from '../services/api'

const OrderTracking = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [currentStatus, setCurrentStatus] = useState(0)
  const [loading, setLoading] = useState(true)

  const trackingSteps = [
    { label: "Order Placed", icon: FiPackage, status: "placed" },
    { label: "Processing", icon: FiCheck, status: "processing" },
    { label: "Shipped", icon: FiTruck, status: "shipped" },
    { label: "Out for Delivery", icon: FiMapPin, status: "out_for_delivery" },
    { label: "Delivered", icon: FiCheckCircle, status: "delivered" }
  ]

  useEffect(() => {
    fetchTrackingInfo()
  }, [id])

  const fetchTrackingInfo = async () => {
    try {
      const response = await orderService.trackOrder(id)
      setOrder(response.data)
      const statusIndex = trackingSteps.findIndex(step => step.status === response.data.status)
      setCurrentStatus(statusIndex >= 0 ? statusIndex : 0)
    } catch (error) {
      console.error('Failed to fetch tracking:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen pt-32 flex justify-center">Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-16"
    >
      <div className="container-custom max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-gray-600 mb-8">Order ID: {id}</p>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
              <div 
                className="h-full bg-primary-600 transition-all duration-500"
                style={{ width: `${(currentStatus / (trackingSteps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {trackingSteps.map((step, index) => {
                const isCompleted = index <= currentStatus
                const isCurrent = index === currentStatus
                const Icon = step.icon

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                    >
                      {isCompleted && index === currentStatus && currentStatus !== trackingSteps.length - 1 ? (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-semibold ${isCompleted ? 'text-primary-600' : 'text-gray-500'}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          
          <div className="space-y-4">
            {order?.items?.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary-600">${order?.total?.toFixed(2)}</span>
            </div>
          </div>

          {/* Estimated Delivery */}
          {order?.estimatedDelivery && currentStatus < trackingSteps.length - 1 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Delivery Confirmation */}
          {currentStatus === trackingSteps.length - 1 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 flex items-center">
                <FiCheckCircle className="mr-2" />
                Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default OrderTracking