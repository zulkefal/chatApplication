const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/ConnectDb');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});