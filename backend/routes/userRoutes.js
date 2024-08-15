const express= require('express');
const { register,login,logOut,getOtherUsers } = require('../controllers/userController');
const IsAuthenticated = require('../middleWare/IsAuthenticated');
const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logOut)
router.route('/').get(IsAuthenticated,getOtherUsers);



module.exports = router;