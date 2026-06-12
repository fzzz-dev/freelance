export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/admin'

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Admin Dashboard'

export const ORDER_STATUS = {
  placed: { label: 'Order Placed', color: 'blue', value: 'placed' },
  processing: { label: 'Processing', color: 'yellow', value: 'processing' },
  shipped: { label: 'Shipped', color: 'purple', value: 'shipped' },
  out_for_delivery: { label: 'Out for Delivery', color: 'orange', value: 'out_for_delivery' },
  delivered: { label: 'Delivered', color: 'green', value: 'delivered' },
  cancelled: { label: 'Cancelled', color: 'red', value: 'cancelled' },
}

export const PRODUCT_STATUS = {
  draft: { label: 'Draft', color: 'gray' },
  published: { label: 'Published', color: 'green' },
  archived: { label: 'Archived', color: 'red' },
}

export const PAYMENT_METHODS = {
  card: 'Credit/Debit Card',
  upi: 'UPI',
  cod: 'Cash on Delivery',
  wallet: 'Wallet',
}

export const SHIPPING_METHODS = {
  standard: { label: 'Standard Shipping', days: '5-7', cost: 5.99 },
  express: { label: 'Express Shipping', days: '2-3', cost: 12.99 },
  overnight: { label: 'Overnight Shipping', days: '1', cost: 24.99 },
}

export const PAGINATION = {
  page: 1,
  limit: 10,
  options: [10, 25, 50, 100],
}
