const CodeBlock = require("../models/codeBlock.js");



async function getAllCodeBlocks(req, res) {
  try {
    const codeBlocks = await CodeBlock.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(codeBlocks);
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Socket.IO event handling
// TODO: should be in different file for example codeBlockSocket.js
function setupSocketIO(io) {
  io.on("connection", (socket) => {
    console.log("Client connected");
    // Send initial code content to the client
    socket.on("initialCodeBlock", async ({ id }) => {
      // Update the code content in the database
      const codeBlockById = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlockById) {
        socket.emit("initialCodeBlock", codeBlockById);
      }
    });

    // Listen for code changes from the client
    socket.on("codeChange", async ({ id, content }) => {
      // Update the code content in the database
      const codeBlockById = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlockById) {
        codeBlockById.update({ content });
        // Broadcast the code change to all connected clients
        io.emit("codeChange", { id, content });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = {
  getAllCodeBlocks,
  setupSocketIO,
};
