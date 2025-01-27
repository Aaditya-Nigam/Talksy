const v2 = require("../lib/cloudinary");
const User = require("../models/auth.model");
const Message = require("../models/message.model");

const getUserForSidebar=async (req,res)=>{
    try {
        const userId=req.user._id;
        const filteredUser=await User.find({_id: {$ne: userId}}).select("-password")
        res.status(201).json(filteredUser);
    } catch (error) {
        console.log("Error in get user for sidebar",error.message);
        res.status(500).json({message: "Internal server error!"})
    }
}

const getMessages=async (req,res)=>{
    try {
        const {id: userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(201).json(messages);
    } catch (error) {
        console.log("Error in get message: ",error.message);
        res.status(500).json({message: "Internal server error!"})
    }
}

const sendMessage=async (req,res)=>{
    try {
        const {id: receiverId}=req.params
        const senderId=req.user._id
        const {text,image}=req.body;
        let imageUrl;
        if(image){
            const uploadedResponse=await v2.uploader.upload(image)
            imageUrl=uploadedResponse.secure_url
        }
        const message=new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        if(!message){
            res.status(500).json({message: "Invlid message"});
        }
        await message.save();
        res.status(201).json(message)
    } catch (error) {
        console.log("Error in send message: ",error.message)
        res.status(500).json({message: "Internal server error!"});
    }
}

module.exports={
    getUserForSidebar,
    getMessages,
    sendMessage
}