const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('New connection', socket.id);
  const userID = socket.handshake.query.userID;
  if (userID !== undefined) {
    console.log('User is authenticated');
    userSocketMap[userID] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('Disconnected', socket.id);
    delete userSocketMap[userID];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server };
