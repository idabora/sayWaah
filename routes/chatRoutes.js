const express = require('express');
const router = express.Router();
const {isAuth}=require('../middleware/auth')
const {userChat,chatBox,getChats}=require('../controllers/chatController')

router.get('/user',isAuth,userChat)
router.get('/chatbox',isAuth,chatBox)
router.get('/chatlist',isAuth,getChats)


module.exports=router;
