const express= require('express');
const { register,login,logOut } = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(register)
router.route('/login').get(login)
router.route('/logout').get(logOut)



module.exports = router;