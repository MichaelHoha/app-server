const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlockRoutes");
const codeBlockController = require("./controllers/codeBlockController");

const app = express();
const server = createServer(app);

// this is meadelweras which handles the cors issues
app.use(cors());
app.use(express.json());

// affect only on routes which starts with '/api'
app.use("/api", codeBlockRoutes);

// start server by attaching Express(node.js library for backend) app to HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  // should've do 'server.listen' instead of 'app.listen'
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.IO server with CORS options
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
codeBlockController.setupSocketIO(io);
