// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { cartService } from '../services/api'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCart(response.data)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1, variant = null) => {
    try {
      const response = await cartService.addToCart(productId, quantity, variant)
      setCart(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await cartService.updateQuantity(itemId, quantity)
      setCart(response.data)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const removeItem = async (itemId) => {
    try {
      const response = await cartService.removeItem(itemId)
      setCart(response.data)
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  const applyCoupon = async (code) => {
    try {
      const response = await cartService.applyCoupon(code)
      setCart(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to apply coupon:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      const response = await cartService.clearCart()
      setCart(response.data)
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      applyCoupon,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}