const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB= require('./config/ConnectDb');

dotenv.config({});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});