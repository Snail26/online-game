const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on("connected", (name) => {
        eval("users." + name + " = " + socket.id);
    });
    socket.on("refreshNames", () => {
        io.emit(users)
    })
});