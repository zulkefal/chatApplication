const express= require('express');
const { sendMessage } = require('../controllers/messageController');
const IsAuthenticated = require('../middleWare/IsAuthenticated');
const router = express.Router();

router.route('/send/:id').post(IsAuthenticated,sendMessage);

module.exports= router;