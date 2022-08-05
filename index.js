const express = require("express");
const app = express();
const PORT = 8000;

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: "Hi from backend"
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = 0;
socketIO.on('connection', (socket) => {
    console.log(`⚡: A user with id: ${socket.id} just connected`);
    users = users + 1;
    console.log(`Number of users on the system currently: ${users}`);
    socket.on('disconnect', () => {
        console.log(`🔥 : A user with id: ${socket.id} disconnected`);
        users = users - 1;
        console.log(`Number of users on the system currently: ${users}`);
    });
});