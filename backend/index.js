const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB= require('./config/ConnectDb');
const userRoutes = require('./routes/userRoutes');

dotenv.config({});



//routes

app.use('/api/user', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});