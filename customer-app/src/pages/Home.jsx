import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import HeroBanner from '../components/home/HeroBanner'
import ProductSection from '../components/home/ProductSection'
import CategorySlider from '../components/home/CategorySlider'
import { productService } from '../services/api'

const Home = () => {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [flashSales, setFlashSales] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [featured, trending, newArrivalsData, flashSalesData, recommended] = await Promise.all([
        productService.getFeatured(),
        productService.getTrending(),
        productService.getNewArrivals(),
        productService.getFlashSales(),
        productService.getRecommended(),
      ])
      
      setFeaturedProducts(featured.data || featured)
      setTrendingProducts(trending.data || trending)
      setNewArrivals(newArrivalsData.data || newArrivalsData)
      setFlashSales(flashSalesData.data || flashSalesData)
      setRecommendedProducts(recommended.data || recommended)
    } catch (error) {
      console.error('Failed to fetch home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 lg:pt-24"
    >
      <HeroBanner />

      {flashSales.length > 0 && (
        <ProductSection
          title="Flash Sales"
          subtitle="Limited time offers"
          products={flashSales}
          showTimer={true}
          timerEnds="2024-01-31T23:59:59"
          viewAllLink="/flash-sales"
          onProductClick={handleProductClick}
        />
      )}

      <CategorySlider />

      {featuredProducts.length > 0 && (
        <ProductSection
          title="Featured Products"
          subtitle="Handpicked just for you"
          products={featuredProducts}
          viewAllLink="/featured"
          onProductClick={handleProductClick}
        />
      )}

      {trendingProducts.length > 0 && (
        <ProductSection
          title="Trending Now"
          subtitle="Most popular this week"
          products={trendingProducts}
          viewAllLink="/trending"
          onProductClick={handleProductClick}
        />
      )}

      {newArrivals.length > 0 && (
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh from the brands"
          products={newArrivals}
          viewAllLink="/new-arrivals"
          onProductClick={handleProductClick}
        />
      )}

      {recommendedProducts.length > 0 && (
        <ProductSection
          title="Recommended for You"
          subtitle="Based on your browsing"
          products={recommendedProducts}
          onProductClick={handleProductClick}
        />
      )}

      <div className="container mx-auto px-4 my-12">
        <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Special Offer</h2>
          <p className="text-lg mb-4">Get up to 50% off on selected items</p>
          <button 
            onClick={handleShopNow}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Shop Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Home