const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const pool = require('./db');
const { swaggerUi, specs } = require('./swagger');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//  Routes
const productRoutes = require('./routes/products');
const dashboardRoutes = require('./routes/dashboard');
const analyticsRoutes = require('./routes/analytics'); // 🆕 NEW route

app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes); // 🆕 Chart.js backend route

// Start Server + Test DB
const PORT = process.env.PORT || 3005;
app.listen(PORT, async () => {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM public.products');
    console.log(`Server running on port ${PORT}`);
    console.log('Connected to:', {
      current_database: process.env.DB_NAME,
      current_user: process.env.DB_USER,
    });
    console.log(`Products table rows: ${res.rows[0].count}`);
  } catch (err) {
    console.error(' DB connection failed:', err);
  }
});
