const express = require('express');
const router = express.Router();
const {isAuth}=require('../middleware/auth')
const {userChat,chatBox}=require('../controllers/chatController')

router.get('/user',isAuth,userChat)
router.get('/chatbox',isAuth,chatBox)


module.exports=router;
