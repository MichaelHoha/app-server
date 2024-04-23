const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlockRoutes");
const codeBlockController = require("./controllers/codeBlockController");

const app = express();
const server = createServer(app); // Create HTTP server using 'http' module

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", codeBlockRoutes);

// Start server by attaching Express app to HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  // Use 'server.listen' instead of 'app.listen'
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.IO server
const io = new Server(server);
codeBlockController.setupSocketIO(io);
