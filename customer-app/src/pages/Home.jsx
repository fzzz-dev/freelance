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
        productService.getProducts({ featured: true, limit: 8 }),
        productService.getTrending(),
        productService.getNewArrivals(),
        productService.getFlashSales(),
        productService.getRecommended(),
      ])
      
      setFeaturedProducts(featured.data)
      setTrendingProducts(trending.data)
      setNewArrivals(newArrivalsData.data)
      setFlashSales(flashSalesData.data)
      setRecommendedProducts(recommended.data)
    } catch (error) {
      console.error('Failed to fetch home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (productId) => {
    navigate(/product/)
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32"
    >
      {/* Hero Banner */}
      <HeroBanner />

      {/* Flash Sales Section */}
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

      {/* Categories Section */}
      <CategorySlider />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <ProductSection
          title="Featured Products"
          subtitle="Handpicked just for you"
          products={featuredProducts}
          viewAllLink="/featured"
          onProductClick={handleProductClick}
        />
      )}

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="Trending Now"
          subtitle="Most popular this week"
          products={trendingProducts}
          viewAllLink="/trending"
          onProductClick={handleProductClick}
        />
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh from the brands"
          products={newArrivals}
          viewAllLink="/new-arrivals"
          onProductClick={handleProductClick}
        />
      )}

      {/* Recommended for You */}
      {recommendedProducts.length > 0 && (
        <ProductSection
          title="Recommended for You"
          subtitle="Based on your browsing"
          products={recommendedProducts}
          onProductClick={handleProductClick}
        />
      )}

      {/* Offer Banner */}
      <div className="container-custom my-12">
        <div className="bg-gradient-to-r from-accent-500 to-primary-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Special Offer</h2>
          <p className="text-lg mb-4">Get up to 50% off on selected items</p>
          <button 
            onClick={handleShopNow}
            className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Shop Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Home
