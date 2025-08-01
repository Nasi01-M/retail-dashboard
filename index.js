// index.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(express.json());

// Serve Swagger UI from the static swagger.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Online Retail API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI at http://localhost:${PORT}/api-docs`);
});
