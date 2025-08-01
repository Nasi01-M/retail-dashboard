# 🛍️ RetailDB: Optimizing Database Performance with PostgreSQL & Node.js

## 📖 Project Overview

This project was developed for **BCS 4103 Advanced Database Systems** at KCA University.  
It demonstrates a high-performance retail management backend with:

- **PostgreSQL** as the database engine  
- **Node.js + Express** for RESTful APIs  
- **Swagger UI** for interactive API documentation  
- **Stored procedures**, **triggers**, and **views** for optimized queries  
- A **filterable dashboard** with **Chart.js** analytics  

---

## 🚀 Features

## 🔗 API Endpoints & Testing

### 1. Products CRUD

| Method | URL                          | Description                   |
|--------|------------------------------|-------------------------------|
| **GET**    | `/api/products`              | List up to 100 products       |
| **GET**    | `/api/products/:id`          | Get one product by its `id`   |
| **POST**   | `/api/products`              | Create a new product          |
| **PUT**    | `/api/products/:id`          | Update an existing product    |
| **DELETE** | `/api/products/:id`          | Delete a product              |

#### Examples
```bash
# List products
curl http://localhost:3005/api/products

# Get product #5
curl http://localhost:3005/api/products/5

# Create a product
curl -X POST http://localhost:3005/api/products \
  -H "Content-Type: application/json" \
  -d '{"product_name":"New Item","unit_price":9.99,"stock_quantity":50}'

# Update product #5
curl -X PUT http://localhost:3005/api/products/5 \
  -H "Content-Type: application/json" \
  -d '{"unit_price":12.99}'

# Delete product #5
curl -X DELETE http://localhost:3005/api/products/5
2. Dashboard (Relational View)
Method	URL	Query Parameters
GET	/api/dashboard	customer (ID), order (ID), product (partial name)

Examples
bash
# Fetch all orders
curl http://localhost:3005/api/dashboard

# Filter by customer
curl "http://localhost:3005/api/dashboard?customer=12748"

# Filter by product substring
curl "http://localhost:3005/api/dashboard?product=lamp"

# Combined filters
curl "http://localhost:3005/api/dashboard?customer=12748&product=lamp"

### 3. Analytics (Monthly Sales)
Method	URL	Description
GET	/api/analytics/sales	Returns monthly total sales

Example
bash
curl http://localhost:3005/api/analytics/sales

### 4. Swagger API Docs
Method	URL	Description
GET	/api-docs	Interactive Swagger UI interface

Try it out:
Visit http://localhost:3005/api-docs in your browser to explore and test every endpoint.
### 1. Schema & Data Population
- Tables: `customers`, `products`, `orders`, `order_items`, `transactions`  
- Indexed on `orders.order_date`, `products.product_name`  
- Populated with **>500k** transaction rows and **16k+** products  

## 2. CRUD API Endpoints
```bash
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

## 3. Dashboard API
GET /api/dashboard

Query parameters:

customer (Customer ID)

order (Order ID)

product (partial product name)

Returns relational view using PostgreSQL view customer_orders_view

## 4. API Documentation (Swagger)
Accessible at: http://localhost:3005/api-docs

Auto-generated from JSDoc annotations in /routes/*.js

## 5. Query Optimization
View: customer_orders_view simplifies multi-join queries

Stored Procedure: get_total_sales(start_date, end_date)

Trigger: trigger_update_stock updates products.stock_quantity on new orders

Benchmarking with EXPLAIN ANALYZE

## 6. Frontend Dashboard
Filter by Customer ID, Order ID, Product Name

Reset filters to view all data

Highlight matching rows

Chart.js bar chart: Monthly sales overview

##🔧 Getting Started
Prerequisites
Node.js ≥ 14

PostgreSQL ≥ 12

### 1. Clone & Install
bash
git clone https://github.com/yourusername/retail-db-performance.git
cd retail-db-performance
npm install

### 2. Configure Environment
Create a .env in project root:
dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=retaildb
PORT=3005

### 3. Initialize Database
bash
# In psql
\i db/schema.sql         -- create tables & indexes
\copy transactions(timestamp...) FROM 'online_retail_clean.csv' CSV HEADER
# Create view, procedures, and trigger:
\i db/views_and_procs.sql
\i db/triggers.sql

### 4. Run Server
bash
npm start
Dashboard UI: http://localhost:3005/

Swagger UI: http://localhost:3005/api-docs

## 🗂️ File Structure
pgsql
retail-db-performance/
├── db/
│   ├── schema.sql           # Tables & indexes
│   ├── views_and_procs.sql  # View & stored procedure
│   └── triggers.sql         # Trigger function
├── public/                  # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── analytics.js
│   ├── dashboard.js
│   └── products.js
├── db.js                    # PostgreSQL pool config
├── server.js                # Express app entrypoint
├── swagger.js               # Swagger setup
├── .env
├── README.md
└── PERFORMANCE_ANALYSIS_REPORT.md
