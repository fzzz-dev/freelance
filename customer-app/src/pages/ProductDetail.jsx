// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { productService } from '../services/api'
import ImageGallery from '../components/product/ImageGallery'
import ReviewsSection from '../components/product/ReviewsSection'
import RelatedProducts from '../components/product/RelatedProducts'
import { toast } from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await productService.getProduct(id)
      const productData = response.data || response
      setProduct(productData)
      if (productData.colors?.[0]) setSelectedColor(productData.colors[0])
      if (productData.sizes?.[0]) setSelectedSize(productData.sizes[0])
    } catch (error) {
      console.error('Failed to fetch product:', error)
      // Set mock product for demo
      setProduct({
        id: parseInt(id),
        name: 'Sample Product',
        price: 99.99,
        discount: 79.99,
        description: 'This is a sample product description. High quality product with great features.',
        rating: 4.5,
        reviewsCount: 128,
        stock: 50,
        brand: 'Sample Brand',
        images: ['https://picsum.photos/id/1/400/400', 'https://picsum.photos/id/2/400/400'],
        colors: ['Black', 'White', 'Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        categoryId: 1,
        specifications: {
          'Material': 'Premium Quality',
          'Weight': '500g',
          'Warranty': '2 Years'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart`)
    // Add to cart logic here
  }

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout')
    // Navigate to checkout logic here
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>
  }

  const discountPercentage = product.discount
    ? Math.round(((product.price - product.discount) / product.price) * 100)
    : 0

  const displayPrice = product.discount || product.price
  const originalPrice = product.price

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <ImageGallery images={product.images || [product.image]} />

          {/* Right Column - Product Info */}
          <div>
            {/* Brand */}
            {product.brand && (
              <p className="text-blue-600 font-semibold mb-2">{product.brand}</p>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name || product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating || 4.5} ({product.reviewsCount || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${displayPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-blue-600 ring-2 ring-blue-600/20'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                >
                  <FiMinus />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                >
                  <FiPlus />
                </button>
                <span className="text-sm text-gray-500">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="text-red-600">Out of Stock</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FiShoppingCart className="inline mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all duration-300">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Information */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex items-center text-gray-600">
                <FiTruck className="w-5 h-5 mr-3 text-blue-600" />
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiShield className="w-5 h-5 mr-3 text-blue-600" />
                <span>2 year warranty included</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiRefreshCw className="w-5 h-5 mr-3 text-blue-600" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Specifications</h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="w-32 font-semibold text-gray-700">{key}</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <ReviewsSection productId={product.id} />

        {/* Related Products */}
        <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
      </div>
    </motion.div>
  )
}

export default ProductDetail