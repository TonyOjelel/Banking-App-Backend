const express = require('express');
const app = express();
const connectDB = require('./config/db');
// Add additional imports/configurations as per your requirements
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/accounts', require('./routes/accountRoutes'));
// Add other routes as needed

// Import route files
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Use route files
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// ...other middleware and server setup

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
