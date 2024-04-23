// app.js
const express = require('express');
const app = express();
const codeBlockRoutes = require('./routes/codeBlockRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', codeBlockRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
