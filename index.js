const express = require('express');
const cors = require("cors");
const app = express();

// blocking the share of data
app.use(cors({ origin: 'http://localhost:3000' }));


const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

const PORT = 4000;

const data = {
    "users": ["One", "Two", "Three", "FIFTH", "Three", "ll", "FIFTH", "popo"]
};

// Allow requests from localhost:3000
io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Sends the data when a user connects
    setInterval(() => {
        socket.emit('dataUpdate', data);
    }, 5000);
});


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
