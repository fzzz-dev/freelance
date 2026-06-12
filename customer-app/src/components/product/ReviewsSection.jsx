// src/components/product/ReviewsSection.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiUser, FiThumbsUp, FiMessageCircle } from 'react-icons/fi'

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      // API placeholder
      // const response = await api.get(`/products/${productId}/reviews`)
      // setReviews(response.data)
      setReviews([
        {
          id: 1,
          user: "John Doe",
          rating: 5,
          title: "Excellent product!",
          comment: "Really satisfied with the quality. Highly recommend!",
          date: "2024-01-15",
          helpful: 12
        },
        {
          id: 2,
          user: "Jane Smith",
          rating: 4,
          title: "Good value for money",
          comment: "Great product but shipping took a bit longer than expected.",
          date: "2024-01-10",
          helpful: 8
        }
      ])
      const avg = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length
      setAverageRating(avg)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) return <div className="py-8 text-center">Loading reviews...</div>

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600">{averageRating.toFixed(1)}</div>
            <div className="flex mt-2">{renderStars(Math.round(averageRating))}</div>
            <div className="text-sm text-gray-500 mt-1">{reviews.length} reviews</div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(r => r.rating === star).length
              const percentage = (count / reviews.length) * 100
              return (
                <div key={star} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-500 w-12">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-100 pb-6"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="font-semibold">{review.user}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors">
                <FiThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.helpful}</span>
              </button>
            </div>
            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-gray-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button */}
      <button className="mt-6 btn-secondary">
        <FiMessageCircle className="inline mr-2" />
        Write a Review
      </button>
    </div>
  )
}

export default ReviewsSection