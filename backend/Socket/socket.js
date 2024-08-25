const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketID = (receiverID) => {
  return userSocketMap[receiverID];
};

io.on('connection', (socket) => {
  console.log('New connection', socket.id);

  const userID = socket.handshake.query.userID;
  console.log('i am user ID', userID);

  if (userID) {
    console.log('User is authenticated:', userID);
    userSocketMap[userID] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  } else {
    console.log('UserID is undefined, disconnecting socket:', socket.id);
    socket.disconnect();
  }

  socket.on('disconnect', () => {
    console.log('Disconnected', socket.id);
    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

module.exports = { app, io, server, getReceiverSocketID };
