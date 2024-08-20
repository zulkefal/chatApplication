const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/ConnectDb');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend origin
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies
  },
});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('New connection', socket.id);
  const userID = socket.handshake.query.userID;
  if (userID !== undefined) {
    userSocketMap[userID] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('Disconnected', socket.id);
    delete userSocketMap[userID];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
