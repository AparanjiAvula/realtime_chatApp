const express=require('express');
const protectRoute = require('../middleware/protectRoute.middleware.js');
const {getUsersForSideBar,getMessages,sendMessage}=require('../controllers/message.controller.js');

const messageRoutes=express.Router();

messageRoutes.get('/users',protectRoute,getUsersForSideBar);
messageRoutes.get('/getMsgs/:id',protectRoute,getMessages);
messageRoutes.post('/send/:id',protectRoute,sendMessage);
module.exports=messageRoutes;