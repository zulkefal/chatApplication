const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/ConnectDb');
const multer = require('multer');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cookieParser = require('cookie-parser');
const { app, server, io } = require('./Socket/socket'); 
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOption={
  origin:'http://localhost:5173',
  credentials:true
};
app.use(cors(corsOption)); 
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes(upload)); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
