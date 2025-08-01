const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { order, customer, product } = req.query;

    console.log("Dashboard filters:", { customer, order, product }); // optional debugging

    let query = `
      SELECT * FROM customer_orders_view
      WHERE 1=1
    `;

    const params = [];

    if (customer) {
      query += ` AND customer_id = $${params.length + 1}`;
      params.push(parseInt(customer)); // Ensure correct type
    }

    if (order) {
      query += ` AND order_id = $${params.length + 1}`;
      params.push(parseInt(order));
    }

    if (product) {
      query += ` AND product_name ILIKE $${params.length + 1}`;
      params.push(`%${product}%`);
    }

    query += ` ORDER BY order_date DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
