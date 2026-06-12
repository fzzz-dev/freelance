import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import ProductCard from '../common/ProductCard'

const ProductSection = ({ 
  title, 
  subtitle, 
  products, 
  viewAllLink, 
  showTimer = false, 
  timerEnds,
  onProductClick 
}) => {
  const navigate = useNavigate()

  const handleViewAll = () => {
    if (viewAllLink) {
      navigate(viewAllLink)
    }
  }

  const handleProductClick = (productId) => {
    if (onProductClick) {
      onProductClick(productId)
    } else {
      navigate(/product/)
    }
  }

  return (
    <section className="container-custom py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
          {showTimer && timerEnds && (
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm font-semibold text-red-600">Ends in:</span>
              <CountdownTimer endDate={timerEnds} />
            </div>
          )}
        </div>
        
        {viewAllLink && (
          <button
            onClick={handleViewAll}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-semibold group"
          >
            <span>View All</span>
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products available in this section.
        </div>
      )}
    </section>
  )
}

// Countdown Timer Component
const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(endDate) - new Date()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="flex space-x-2 text-sm font-mono">
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
        {String(timeLeft.days).padStart(2, '0')}d
      </span>
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
        {String(timeLeft.hours).padStart(2, '0')}h
      </span>
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
        {String(timeLeft.minutes).padStart(2, '0')}m
      </span>
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
        {String(timeLeft.seconds).padStart(2, '0')}s
      </span>
    </div>
  )
}

export default ProductSection
