const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const IsAuthenticated = require('../middleWare/IsAuthenticated');
const router = express.Router();

module.exports = (upload) => {
    router.route('/send/:id').post(IsAuthenticated, upload.single('file'), sendMessage);
    router.route('/:id').get(IsAuthenticated, getMessage);

  return router;
};