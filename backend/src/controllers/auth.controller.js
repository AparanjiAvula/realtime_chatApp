const userModel=require('../models/user.model.js');
const bcrypt=require('bcryptjs');
const generateToken=require('../lib/utils.js');
const cloudinary=require('../lib/cloudinary.js');


const signup=async(req,res)=>{
   const {fullName,email,password}=req.body;
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"});
    }
    if(password.length<6){
      return res.status(400).json({message:"Password must be greater than 6 characters"});
    }
    const user=await userModel.findOne({email});
    if(user) return res.status(400).json({message:"User Already exists"});
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    const newUser=new userModel({
      fullName,
      email,
      password:hashPassword
    })
    if(newUser){
     //generate jwt
      generateToken(newUser._id,res);
      await newUser.save();
      res.status(201).json([{
         _id:newUser._id,
         fullName:newUser.fullName,
         email:newUser.email,
         profilPic:newUser.profilePic,
      },{msg:"signup successfully"}])
    }

    else{
     res.status(400).json({message:"Invalid user data"})
    }

  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({message:"Internal server Error"});
  }
}
const login=async(req,res)=>{
   const {email,password}=req.body;
try {
   if(!email || !password) return res.status(400).json({message:"All fields required"});
   const userExist=await userModel.findOne({email});
   if(!userExist){
      return res.status(400).json({message:"User not Registered or User not exist"});
   }
   const isPassword=await bcrypt.compare(password,userExist.password);
   if(!isPassword){
      return res.status(400).json({message:"Password Not Matched"});
   }
   generateToken(userExist._id,res)//generate token
   res.status(200).json([{
      _id:userExist._id,
      fullName:userExist.fullName,
      email:userExist.email,
      profilePic:userExist.profilePic
   },{msg:"Logged In Successfully"}]);
} catch (error) {
   console.log("Error occured in login controller",error.message);
   res.status(500).json({message:"Internal server Error"});
}
}
const logout=async(req,res)=>{
   try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Successfully"})
   } catch (error) {
      console.log("Error  in logout controller",error.message);
      res.status(500).json({message:"Internal server Error"});
   }
}

const updateProfile=async(req,res)=>{
   try {
      const {profilePic}=req.body;
      console.log(req.body);
      const userId=req.user._id;
      if(!profilePic){
         return res.status(400).json({message:"Profile pic is required"})
      }
      const uploadResponse=await cloudinary.uploader.upload(profilePic);
      const updatedUser=await userModel.findByIdAndUpdate(
         userId,
         {profilePic:uploadResponse.secure_url},
         {new:true})
      res.status(200).json(updatedUser)
   } catch (error) {
      console.log("Error  in profileUpdate controller",error.message);
      res.status(500).json({message:"Internal server Error"});
   }
}

const checkAuth=(req,res)=>{
    try {
       res.status(200).json(req.user);
    } catch (error) {
      console.log("Error  in checkAuth controller",error.message);
      res.status(500).json({message:"Internal server Error"});
    }
}

module.exports={signup,login,logout,updateProfile,checkAuth}