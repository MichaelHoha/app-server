const CodeBlock = require("../models/codeBlock.js");

// The getAllCodeBlocks function is an asynchronous function that retrieves 
// all code blocks from the database and sends them as a JSON response.
async function getAllCodeBlocks(req, res) {
  try {
    const codeBlocks = await CodeBlock.findAll();
    res.json(codeBlocks);
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// should've move this file to deffernt component: for example codeBlockSocket.js
// Socket.IO event handling
function setupSocketIO(io) {
  io.on("connection", (socket) => {
    console.log("Client connected");

    // sends initial code content to the client
    socket.on("initialCodeBlock", async ({ id }) => {
      const codeBlockById = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlockById) {
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
        // sends the code change to all connected users/clients in the frontend
        io.emit("codeChange", { id, content });
      }
    });

    // seting the number of participants in the code block
    socket.on("setPraticipantesCount", async ({ id, participants_count }) => {
      const codeBlock = await CodeBlock.findOne({
        where: {
          id,
        },
      });

      if (codeBlock) {
        participants_count = 1;
        codeBlock.update({ participants_count });
        io.emit("setPraticipantesCount", { id, participants_count });
      }

      // updates when user is leaving the code block
      socket.on(
        "praticipantesCountDown",
        async ({ id, participants_count }) => {
          const codeBlock = await CodeBlock.findOne({
            where: {
              id,
            },
          });

          if (codeBlock) {
            participants_count = 0;
            codeBlock.update({ participants_count });
             io.emit("praticipantesCountDown", { id, participants_count });
          }
        }
      );
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
