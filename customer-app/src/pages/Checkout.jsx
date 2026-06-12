// src/pages/Checkout.jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCreditCard, FiSmartphone, FiHome, FiCheck } from 'react-icons/fi'
import { CartContext } from '../context/CartContext'
import { orderService } from '../services/api'
import AddressStep from '../components/checkout/AddressStep'
import PaymentStep from '../components/checkout/PaymentStep'
import ReviewStep from '../components/checkout/ReviewStep'

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [address, setAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [processing, setProcessing] = useState(false)
  const { cart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const steps = [
    { number: 1, title: "Address", icon: FiHome },
    { number: 2, title: "Payment", icon: FiCreditCard },
    { number: 3, title: "Review", icon: FiCheck }
  ]

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (paymentData) => {
    setPaymentMethod(paymentData)
    setCurrentStep(3)
  }

  const handlePlaceOrder = async () => {
    setProcessing(true)
    try {
      const orderData = {
        items: cart.items,
        address,
        paymentMethod,
        total: cart.total
      }
      const response = await orderService.createOrder(orderData)
      await clearCart()
      navigate(`/order-confirmation/${response.data.id}`)
    } catch (error) {
      console.error('Failed to place order:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-sm font-semibold hidden sm:block">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-0 w-full h-0.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <AddressStep onSubmit={handleAddressSubmit} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <PaymentStep onSubmit={handlePaymentSubmit} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ReviewStep
                  address={address}
                  paymentMethod={paymentMethod}
                  cart={cart}
                  onPlaceOrder={handlePlaceOrder}
                  processing={processing}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Checkout
