const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlockRoutes");
const codeBlockController = require("./controllers/codeBlockController");

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", codeBlockRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server);
codeBlockController.setupSocketIO(io);
