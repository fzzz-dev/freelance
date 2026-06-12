=========================================
ADMIN APP APIs (Port: 3001)
=========================================

// Authentication APIs
POST http://localhost:3001/api/admin/auth/login
POST http://localhost:3001/api/admin/auth/register
POST http://localhost:3001/api/admin/auth/logout
POST http://localhost:3001/api/admin/auth/forgot-password
POST http://localhost:3001/api/admin/auth/reset-password

// Dashboard & Analytics APIs
GET http://localhost:3001/api/admin/analytics/stats
GET http://localhost:3001/api/admin/analytics/sales
GET http://localhost:3001/api/admin/analytics/performance
GET http://localhost:3001/api/admin/analytics/category-performance
GET http://localhost:3001/api/admin/analytics/revenue
GET http://localhost:3001/api/admin/analytics/orders-stats

// Category APIs
GET    http://localhost:3001/api/admin/categories
GET    http://localhost:3001/api/admin/categories/:id
POST   http://localhost:3001/api/admin/categories
PUT    http://localhost:3001/api/admin/categories/:id
DELETE http://localhost:3001/api/admin/categories/:id
PUT    http://localhost:3001/api/admin/categories/:id/status

// Product APIs
GET    http://localhost:3001/api/admin/products
GET    http://localhost:3001/api/admin/products/:id
POST   http://localhost:3001/api/admin/products
PUT    http://localhost:3001/api/admin/products/:id
DELETE http://localhost:3001/api/admin/products/:id
PUT    http://localhost:3001/api/admin/products/:id/status
GET    http://localhost:3001/api/admin/products?page=1&search=&category=&status=

// Inventory APIs
GET    http://localhost:3001/api/admin/inventory
GET    http://localhost:3001/api/admin/inventory/low-stock
PUT    http://localhost:3001/api/admin/products/:id/inventory
PUT    http://localhost:3001/api/admin/inventory/bulk-update

// Order APIs
GET    http://localhost:3001/api/admin/orders
GET    http://localhost:3001/api/admin/orders/:id
PUT    http://localhost:3001/api/admin/orders/:id/status
PUT    http://localhost:3001/api/admin/orders/:id/shipping
GET    http://localhost:3001/api/admin/orders?search=&status=&date-from=&date-to=

// Customer APIs
GET    http://localhost:3001/api/admin/customers
GET    http://localhost:3001/api/admin/customers/:id
PUT    http://localhost:3001/api/admin/customers/:id
DELETE http://localhost:3001/api/admin/customers/:id
PUT    http://localhost:3001/api/admin/customers/:id/status
GET    http://localhost:3001/api/admin/customers?search=&page=1&limit=10

// Coupon APIs
GET    http://localhost:3001/api/admin/coupons
GET    http://localhost:3001/api/admin/coupons/:id
POST   http://localhost:3001/api/admin/coupons
PUT    http://localhost:3001/api/admin/coupons/:id
DELETE http://localhost:3001/api/admin/coupons/:id
PUT    http://localhost:3001/api/admin/coupons/:id/status

// Profile & Settings APIs
GET    http://localhost:3001/api/admin/profile
PUT    http://localhost:3001/api/admin/profile
PUT    http://localhost:3001/api/admin/change-password
GET    http://localhost:3001/api/admin/settings
PUT    http://localhost:3001/api/admin/settings

// Report APIs
GET    http://localhost:3001/api/admin/reports/sales
GET    http://localhost:3001/api/admin/reports/products
GET    http://localhost:3001/api/admin/reports/customers
GET    http://localhost:3001/api/admin/reports/download

=========================================
CUSTOMER APP APIs (Port: 3001)
=========================================

// Authentication APIs
POST   http://localhost:3001/api/auth/login
POST   http://localhost:3001/api/auth/register
POST   http://localhost:3001/api/auth/logout
POST   http://localhost:3001/api/auth/forgot-password
POST   http://localhost:3001/api/auth/reset-password
GET    http://localhost:3001/api/auth/verify-email/:token
POST   http://localhost:3001/api/auth/resend-verification

// Product APIs
GET    http://localhost:3001/api/products
GET    http://localhost:3001/api/products/featured
GET    http://localhost:3001/api/products/trending
GET    http://localhost:3001/api/products/new-arrivals
GET    http://localhost:3001/api/products/flash-sales
GET    http://localhost:3001/api/products/recommended
GET    http://localhost:3001/api/products/:id
GET    http://localhost:3001/api/products/category/:categoryId
GET    http://localhost:3001/api/products/search?q=keyword
GET    http://localhost:3001/api/products?page=1&limit=20&sort=price&order=asc

// Category APIs
GET    http://localhost:3001/api/categories
GET    http://localhost:3001/api/categories/:id
GET    http://localhost:3001/api/categories/:id/products
GET    http://localhost:3001/api/categories/featured

// Cart APIs
GET    http://localhost:3001/api/cart
POST   http://localhost:3001/api/cart/add
PUT    http://localhost:3001/api/cart/update/:id
DELETE http://localhost:3001/api/cart/remove/:id
DELETE http://localhost:3001/api/cart/clear
POST   http://localhost:3001/api/cart/apply-coupon
DELETE http://localhost:3001/api/cart/remove-coupon
GET    http://localhost:3001/api/cart/count

// Order APIs
GET    http://localhost:3001/api/orders
GET    http://localhost:3001/api/orders/:id
POST   http://localhost:3001/api/orders/create
PUT    http://localhost:3001/api/orders/:id/cancel
GET    http://localhost:3001/api/orders/track/:id
POST   http://localhost:3001/api/orders/:id/return
GET    http://localhost:3001/api/orders/recent

// Checkout APIs
POST   http://localhost:3001/api/checkout
POST   http://localhost:3001/api/checkout/verify-payment
GET    http://localhost:3001/api/checkout/shipping-methods
GET    http://localhost:3001/api/checkout/payment-methods
POST   http://localhost:3001/api/checkout/calculate-shipping

// User/Profile APIs
GET    http://localhost:3001/api/user/profile
PUT    http://localhost:3001/api/user/profile
PUT    http://localhost:3001/api/user/change-password
POST   http://localhost:3001/api/user/upload-avatar
DELETE http://localhost:3001/api/user/avatar
GET    http://localhost:3001/api/user/dashboard

// Address APIs
GET    http://localhost:3001/api/user/addresses
GET    http://localhost:3001/api/user/addresses/:id
POST   http://localhost:3001/api/user/addresses
PUT    http://localhost:3001/api/user/addresses/:id
DELETE http://localhost:3001/api/user/addresses/:id
PUT    http://localhost:3001/api/user/addresses/:id/default

// Wishlist APIs
GET    http://localhost:3001/api/wishlist
POST   http://localhost:3001/api/wishlist/add
DELETE http://localhost:3001/api/wishlist/remove/:productId
GET    http://localhost:3001/api/wishlist/check/:productId
DELETE http://localhost:3001/api/wishlist/clear

// Search APIs
GET    http://localhost:3001/api/search?q=keyword
GET    http://localhost:3001/api/search/trending
GET    http://localhost:3001/api/search/history
POST   http://localhost:3001/api/search/save
DELETE http://localhost:3001/api/search/clear-history
GET    http://localhost:3001/api/search/suggest?q=keyword

// Review & Rating APIs
GET    http://localhost:3001/api/reviews/product/:productId
POST   http://localhost:3001/api/reviews
PUT    http://localhost:3001/api/reviews/:id
DELETE http://localhost:3001/api/reviews/:id
GET    http://localhost:3001/api/reviews/user
GET    http://localhost:3001/api/reviews/product/:productId/rating

// Coupon APIs
GET    http://localhost:3001/api/coupons/validate?code=COUPON_CODE
GET    http://localhost:3001/api/coupons/available

// Notification APIs
GET    http://localhost:3001/api/notifications
GET    http://localhost:3001/api/notifications/unread-count
PUT    http://localhost:3001/api/notifications/:id/read
PUT    http://localhost:3001/api/notifications/mark-all-read
DELETE http://localhost:3001/api/notifications/:id

// Payment APIs
POST   http://localhost:3001/api/payments/create-intent
POST   http://localhost:3001/api/payments/confirm
GET    http://localhost:3001/api/payments/methods
POST   http://localhost:3001/api/payments/refund/:id

// Static/Content APIs
GET    http://localhost:3001/api/settings
GET    http://localhost:3001/api/banners
GET    http://localhost:3001/api/pages/:slug
GET    http://localhost:3001/api/faqs
GET    http://localhost:3001/api/contact-info

=========================================
QUICK REFERENCE CARDS
=========================================

ADMIN QUICK REFERENCE:
----------------------
Auth:            /api/admin/auth/*
Dashboard:       /api/admin/analytics/*
Categories:      /api/admin/categories
Products:        /api/admin/products
Inventory:       /api/admin/inventory
Orders:          /api/admin/orders
Customers:       /api/admin/customers
Coupons:         /api/admin/coupons
Profile:         /api/admin/profile
Reports:         /api/admin/reports

CUSTOMER QUICK REFERENCE:
-------------------------
Auth:            /api/auth/*
Products:        /api/products
Categories:      /api/categories
Cart:            /api/cart
Orders:          /api/orders
Checkout:        /api/checkout
User:            /api/user/*
Addresses:       /api/user/addresses
Wishlist:        /api/wishlist
Search:          /api/search
Reviews:         /api/reviews
Coupons:         /api/coupons
Notifications:   /api/notifications
Payments:        /api/payments