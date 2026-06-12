// src/App.jsx (complete with all pages)
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

// Pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderTracking from './pages/OrderTracking'
import UserProfile from './pages/UserProfile'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// NEW PAGES - Create these files
import Featured from './pages/Featured'
import Trending from './pages/Trending'
import NewArrivals from './pages/NewArrivals'
import FlashSales from './pages/FlashSales'
import Products from './pages/Products'
import CategoryPage from './pages/CategoryPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Main Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                  <Route path="/tracking/:id" element={<OrderTracking />} />
                  <Route path="/profile/*" element={<UserProfile />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* NEW SECTION ROUTES - Add these */}
                  <Route path="/featured" element={<Featured />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/flash-sales" element={<FlashSales />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/category/:id" element={<CategoryPage />} />
                  
                  {/* 404 - MUST be last */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
