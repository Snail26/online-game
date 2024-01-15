const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
  });

io.on('connection', (socket) => {
    socket.on("connected", (name) => {
        users.unshift(name);
    });
    socket.on("refreshNames", () => {
        io.emit("refreshNames", users);
    });
    socket.on("matchmaking", () => {
        socket.broadcast.emit("matchmaking")
    });
    socket.on("matched", (id) => {
        io.emit("matched", id)
    });
});