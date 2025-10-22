const userModel=require('../models/user.model.js');
const messageModel=require('../models/message.model.js');
const cloudinary=require('../lib/cloudinary.js');
const {getReceiverSocketId,io}=require('../lib/socket.js');

const getUsersForSideBar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUserId=await userModel.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUserId); 
    } catch (error) {
        console.log("Error  in GetUsersForSideBar controller",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

const getMessages=async(req,res)=>{
    try {
        const userToChatId=req.params.id;
        const myId=req.user._id;
        const messages=await messageModel.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error  in getMessages controller:",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            //upload based image to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessages=new messageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
        await newMessages.save();
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessages)
        }
        //todo:realtime chat functionality goes here => socket.io
        res.status(200).json(newMessages);
    } catch (error) {
        console.log("Error  in sendMessages controller",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
module.exports={getUsersForSideBar,getMessages,sendMessage};