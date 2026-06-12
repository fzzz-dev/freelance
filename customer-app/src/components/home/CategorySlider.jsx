import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CategorySlider = () => {
  const navigate = useNavigate()
  
  const categories = [
    { id: 1, name: 'Today\'s Deals', slug: 'todays-deals', icon: '🔥', color: 'bg-red-100' },
    { id: 2, name: 'New Arrivals', slug: 'new-arrivals', icon: '✨', color: 'bg-green-100' },
    { id: 3, name: 'Electronics', slug: 'electronics', icon: '📱', color: 'bg-blue-100' },
    { id: 4, name: 'Fashion', slug: 'fashion', icon: '👕', color: 'bg-pink-100' },
    { id: 5, name: 'Home & Living', slug: 'home-living', icon: '🏠', color: 'bg-yellow-100' },
    { id: 6, name: 'Sports', slug: 'sports', icon: '⚽', color: 'bg-orange-100' },
  ]

  const handleCategoryClick = (category) => {
    if (category.name === 'Today\'s Deals') {
      navigate('/flash-sales')
    } else if (category.name === 'New Arrivals') {
      navigate('/new-arrivals')
    } else {
      navigate(`/category/${category.slug}`)
    }
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category)}
            className={`${category.color} rounded-xl p-4 text-center cursor-pointer transition-shadow hover:shadow-lg`}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <p className="font-semibold text-gray-800">{category.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CategorySlider