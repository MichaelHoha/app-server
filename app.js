const express = require("express");
const app = express();
const codeBlockRoutes = require("./routes/codeBlockRoutes");
const codeBlockController = require("./controllers/codeBlockController");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", codeBlockRoutes);

codeBlockController.setupSocketIO(io);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socketIO(app);
codeBlockController.setupSocketIO(io);