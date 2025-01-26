import Message from "../models/message.models.js";
import User from "../models/user.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { ApiError } from "../lib/apiError.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filtered_users = await User.find({
            _id: { $ne: loggedInUser } }).select('-password')
        res.status(200).json(filtered_users);
    }catch(err) {
        console.log("Error in getUserSidebar function: ", err);
        return new ApiError("Internal server error", 500);
    }
}


export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        }).sort({createdAt: 1});
        res.status(200).json(messages);
    }catch(err) {
        console.log("Error in getMessages function: ", err);
        return new ApiError("Internal server error", 500);
    }
}



export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let imgUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl  = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        })
        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        res.status(200).json(newMessage);
    }catch(err) {
        console.log("Error in sendMessage function: ", err);
        return new ApiError("Internal server error", 500);
    }
}