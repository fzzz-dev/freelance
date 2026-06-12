// src/utils/constants.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export const CURRENCY = import.meta.env.VITE_CURRENCY || 'USD'

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ShopHub'

export const SHIPPING_THRESHOLD = 50
export const SHIPPING_COST = 5.99
export const TAX_RATE = 0.1

export const PRODUCT_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'toys', name: 'Toys', icon: '🎮' },
]

export const ORDER_STATUS = {
  placed: { label: 'Order Placed', color: 'blue' },
  processing: { label: 'Processing', color: 'yellow' },
  shipped: { label: 'Shipped', color: 'purple' },
  out_for_delivery: { label: 'Out for Delivery', color: 'orange' },
  delivered: { label: 'Delivered', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
}

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
]