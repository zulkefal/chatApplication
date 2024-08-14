const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB= require('./config/ConnectDb');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const cookieParser = require('cookie-parser');

dotenv.config({});

app.use(express.json());
app.use(cookieParser());

//routes

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});