const express = require('express');
const router = express.Router();
const {userChat}=require('../controllers/chatController')

router.get('/user',isAuth,userChat)


module.exports=router;