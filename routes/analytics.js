const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET monthly sales totals
router.get('/sales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(o.order_date, 'YYYY-MM') AS month,
        ROUND(SUM(oi.total_price), 2) AS total_sales
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.order_id
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
