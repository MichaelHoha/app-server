require('dotenv').config();

// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { setupSockets } = require('./src/sockets.js');

// data base
const cors = require('cors');
const codeRoutes = require('./routes/codeRoutes');

// Initialize Express app
const service = express();

// import the scheme
const db = require('./mongodb/db.js');
const db_scheme = require('./mongodb/scheme.js');

// Middleware
app.use(express.json());
app.use(cors());

// Set up HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = socketIo(server);
setupSockets(io);

// Set up routes
app.use('/api/code', codeRoutes);


function fetch_code_blocks() {
  return new Promise((resolve,reject) => {
    db.getTitles(db_scheme.codeBlockSchema)
    .then((result) => {

    })
  })
}


service.post('/code/Test2', (req, res) => {
  fetch_code_blocks()
  .then(res => resolve(res))
  .catch(req => console.log(req))
} )





// Start the server
const PORT = process.env.SERVER_PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
