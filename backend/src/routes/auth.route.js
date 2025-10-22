const express=require('express');
const {signup,login,logout,updateProfile,checkAuth}=require('../controllers/auth.controller.js')
const protectRoute=require('../middleware/protectRoute.middleware.js');

const authRoutes=express.Router();

authRoutes.post('/signup',signup)

authRoutes.post('/login',login)

authRoutes.post('/logout',logout)

authRoutes.put('/update-profile',protectRoute,updateProfile);

authRoutes.get('/check',protectRoute,checkAuth)

module.exports=authRoutes;