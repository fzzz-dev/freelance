// src/services/api.js - Complete mock version for UI development
import axios from 'axios';

const mockData = {
  products: {
    featured: [
      { id: 1, name: 'Featured Product 1', price: 99, image: 'https://via.placeholder.com/300', rating: 4.5 },
      { id: 2, name: 'Featured Product 2', price: 149, image: 'https://via.placeholder.com/300', rating: 4.8 }
    ],
    trending: [
      { id: 3, name: 'Trending Product 1', price: 79, image: 'https://via.placeholder.com/300' },
      { id: 4, name: 'Trending Product 2', price: 129, image: 'https://via.placeholder.com/300' }
    ],
    newArrivals: [
      { id: 5, name: 'New Arrival 1', price: 89, image: 'https://via.placeholder.com/300' }
    ],
    flashSales: [
      { id: 6, name: 'Flash Sale 1', price: 49, originalPrice: 99, image: 'https://via.placeholder.com/300' }
    ],
    recommended: [
      { id: 7, name: 'Recommended 1', price: 119, image: 'https://via.placeholder.com/300' }
    ],
    list: { products: [], total: 0, page: 1, pages: 1 }
  },
  categories: [
    { id: 1, name: 'Electronics', slug: 'electronics', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Clothing', slug: 'clothing', image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Books', slug: 'books', image: 'https://via.placeholder.com/100' }
  ],
  cart: { items: [], total: 0 },
  user: { id: 1, name: 'Test User', email: 'test@example.com' },
  wishlist: []
};

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    
    if (url.includes('featured')) return Promise.resolve({ data: mockData.products.featured });
    if (url.includes('trending')) return Promise.resolve({ data: mockData.products.trending });
    if (url.includes('new-arrivals')) return Promise.resolve({ data: mockData.products.newArrivals });
    if (url.includes('flash-sales')) return Promise.resolve({ data: mockData.products.flashSales });
    if (url.includes('recommended')) return Promise.resolve({ data: mockData.products.recommended });
    if (url.includes('categories')) return Promise.resolve({ data: mockData.categories });
    if (url.includes('cart')) return Promise.resolve({ data: mockData.cart });
    if (url.includes('login')) return Promise.resolve({ data: { token: 'mock-token', user: mockData.user } });
    if (url.includes('register')) return Promise.resolve({ data: { success: true, user: mockData.user } });
    if (url.includes('profile')) return Promise.resolve({ data: mockData.user });
    if (url.includes('wishlist')) return Promise.resolve({ data: mockData.wishlist });
    
    return Promise.resolve({ data: [], status: 200 });
  }
);

export default api;

export const productService = {
  getProducts: async () => ({ data: mockData.products.list }),
  getFeatured: async () => ({ data: mockData.products.featured }),
  getTrending: async () => ({ data: mockData.products.trending }),
  getNewArrivals: async () => ({ data: mockData.products.newArrivals }),
  getFlashSales: async () => ({ data: mockData.products.flashSales }),
  getRecommended: async () => ({ data: mockData.products.recommended })
};

export const categoryService = {
  getCategories: async () => ({ data: mockData.categories })
};

export const cartService = {
  getCart: async () => ({ data: mockData.cart }),
  addToCart: async (data) => ({ data: { success: true } }),
  updateCart: async (id, data) => ({ data: { success: true } }),
  removeFromCart: async (id) => ({ data: { success: true } })
};

export const authService = {
  login: async (credentials) => ({ data: { token: 'mock-token', user: mockData.user } }),
  register: async (userData) => ({ data: { success: true, user: mockData.user } }),
  logout: () => {},
  getProfile: async () => ({ data: mockData.user })
};

export const userService = {
  getProfile: async () => ({ data: mockData.user }),
  updateProfile: async (data) => ({ data: { success: true, ...data } }),
  getAddresses: async () => ({ data: [] }),
  addAddress: async (data) => ({ data: { success: true, ...data } }),
  updateAddress: async (id, data) => ({ data: { success: true, ...data } }),
  deleteAddress: async (id) => ({ data: { success: true } })
};

export const searchService = {
  getTrending: async () => ({ data: [] }),
  getHistory: async () => ({ data: [] })
};

export const orderService = {
  createOrder: async (orderData) => ({ data: { success: true, orderId: Date.now(), ...orderData } }),
  getOrders: async () => ({ data: [] }),
  getOrder: async (id) => ({ data: { id, status: 'pending', total: 0, items: [] } }),
  cancelOrder: async (id) => ({ data: { success: true } })
};

export const wishlistService = {
  getWishlist: async () => ({ data: [] }),
  addToWishlist: async (productId) => ({ data: { success: true } }),
  removeFromWishlist: async (productId) => ({ data: { success: true } }),
  isInWishlist: async (productId) => ({ data: false })
};