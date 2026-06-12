//Authentication

POST http://localhost:3001/api/admin/auth/login
POST http://localhost:3001/api/admin/auth/register

//Analytics and Dashboard

GET http://localhost:3001/api/admin/analytics/stats
GET http://localhost:3001/api/admin/analytics/sales
GET http://localhost:3001/api/admin/analytics/performance
GET http://localhost:3001/api/admin/analytics/category-performance

//Category

GET    http://localhost:3001/api/admin/categories
POST   http://localhost:3001/api/admin/categories
PUT    http://localhost:3001/api/admin/categories/:id
DELETE http://localhost:3001/api/admin/categories/:id

//Product

GET    http://localhost:3001/api/admin/products
POST   http://localhost:3001/api/admin/products
GET    http://localhost:3001/api/admin/products/:id
PUT    http://localhost:3001/api/admin/products/:id
DELETE http://localhost:3001/api/admin/products/:id
GET    http://localhost:3001/api/admin/products?page=1&search=&category=

//Order Api

GET    http://localhost:3001/api/admin/orders
GET    http://localhost:3001/api/admin/orders/:id
PUT    http://localhost:3001/api/admin/orders/:id/status
GET    http://localhost:3001/api/admin/orders?search=&status=

//Customer APIs

GET    http://localhost:3001/api/admin/customers
GET    http://localhost:3001/api/admin/customers/:id
PUT    http://localhost:3001/api/admin/customers/:id
GET    http://localhost:3001/api/admin/customers?search=

//Inventory APIs

GET    http://localhost:3001/api/admin/products?search=  (for inventory)
PUT    http://localhost:3001/api/admin/products/:id/inventory

//Coupon APIs

GET    http://localhost:3001/api/admin/coupons
POST   http://localhost:3001/api/admin/coupons
PUT    http://localhost:3001/api/admin/coupons/:id
DELETE http://localhost:3001/api/admin/coupons/:id

//Profile

GET    http://localhost:3001/api/admin/profile
PUT    http://localhost:3001/api/admin/profile
PUT    http://localhost:3001/api/admin/change-password