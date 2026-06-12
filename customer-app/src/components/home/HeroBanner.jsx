// src/components/home/HeroBanner.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])

  useEffect(() => {
    const fetchSlides = async () => {
      // Using real working images from picsum
      setSlides([
        { 
          id: 1, 
          title: "Summer Sale", 
          subtitle: "Up to 50% off on selected items", 
          image: "https://picsum.photos/id/26/1200/400", 
          cta: "Shop Now" 
        },
        { 
          id: 2, 
          title: "New Arrivals", 
          subtitle: "Latest collection just dropped", 
          image: "https://picsum.photos/id/20/1200/400", 
          cta: "Explore" 
        },
        { 
          id: 3, 
          title: "Flash Sale", 
          subtitle: "Limited time offers", 
          image: "https://picsum.photos/id/22/1200/400", 
          cta: "Shop Flash Sales" 
        },
      ])
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  if (slides.length === 0) {
    return (
      <div className="relative h-[500px] overflow-hidden rounded-2xl mb-12 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Loading banner...
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl mx-4 mb-12">
      <AnimatePresence mode="wait">
        {slides[currentSlide] && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white max-w-lg"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{slides[currentSlide].title}</h2>
                  <p className="text-lg md:text-xl mb-6">{slides[currentSlide].subtitle}</p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105">
                    {slides[currentSlide].cta}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-blue-600' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner