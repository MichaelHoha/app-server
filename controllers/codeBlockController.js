const CodeBlock = require("../models/codeBlock.js");

async function getAllCodeBlocks(req, res) {
  try {
    const codeBlocks = await CodeBlock.findAll();
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
      const codeBlockById = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlockById) {
        console.log("Initial code block sent to client " + codeBlockById);
        socket.emit("initialCodeBlock", codeBlockById);
      }
    });

    // looking for code changes from the client
    socket.on("codeChange", async ({ id, content }) => {
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

    socket.on("setPraticipantesCount", async ({ id }) => {
      const codeBlock = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlock) {
        // Update participants count in the database
        codeBlock.participants_count += 1;
        await codeBlock.save();

        // Emit updated participants count to all clients
        io.emit("praticipantesCountUpdated", {
          blockId,
          participantsCount: codeBlock.participants_count,
        });
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
