// src/components/home/OfferBanner.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiRefreshCw, FiClock } from 'react-icons/fi'

const OfferBanner = () => {
  const offers = [
    { icon: FiTruck, title: "Free Shipping", description: "On orders over $50", color: "bg-blue-500" },
    { icon: FiShield, title: "Secure Payment", description: "100% secure transactions", color: "bg-green-500" },
    { icon: FiRefreshCw, title: "Easy Returns", description: "30-day return policy", color: "bg-purple-500" },
    { icon: FiClock, title: "24/7 Support", description: "Dedicated customer service", color: "bg-orange-500" }
  ]

  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-8 my-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all"
            >
              <div className={`${offer.color} p-3 rounded-full text-white`}>
                <offer.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                <p className="text-sm text-gray-500">{offer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OfferBanner