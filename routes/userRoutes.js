const express = require('express');
const router = express.Router();
const { User } = require("../Model/index");
const {isAuth} = require('../middleware/auth');
const {completeProfile,getProfile}=require('../controllers/userController')

router.put('/completeprofile',isAuth,completeProfile);
router.get('/getprofile',isAuth,getProfile);


module.exports=router;
