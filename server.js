// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { setupSockets } = require('./sockets');
const codeRoutes = require('./routes/codeRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Set up HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = socketIo(server);
setupSockets(io);

// Set up routes
app.use('/api/code', codeRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
