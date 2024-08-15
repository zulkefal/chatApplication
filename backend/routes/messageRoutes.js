const express= require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const IsAuthenticated = require('../middleWare/IsAuthenticated');
const router = express.Router();

router.route('/send/:id').post(IsAuthenticated,sendMessage);
router.route('/:id').get(IsAuthenticated,getMessage);


module.exports= router;