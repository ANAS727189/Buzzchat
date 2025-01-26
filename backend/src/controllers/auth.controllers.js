import { generateToken } from '../lib/utils.js';
import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import { ApiError } from '../lib/apiError.js';

export const signUp = async (req, res) => {
    try{
        const {email, password, fullName} = req.body;
        if(!email || !password || !fullName)return new ApiError("Please fill in all fields", 400);
        const user = await User.findOne({email});
        if(user) return new ApiError("The email already exists", 400);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
    }catch(err){
        console.log("Sign up error: ", err);
        return new ApiError("Internal Server Error", 500);
    }
}


export const signIn = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return new ApiError("Please fill in all fields", 400);
        const user = await User.findOne({email});
        if(!user) return new ApiError("Invalid credentials", 400);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return new ApiError("Invalid credentials", 400);
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    }catch(err) {
        console.log("Sign in error: ", err);
        return new ApiError("Internal Server Error", 500);
    }
}


export const logOut = async(req, res) => {
    try {
        res.clearCookie("jwt", {maxAge: 0});
        res.status(200).json({message: "Logged out"});
    }catch(err) {
        console.log("Log out error: ", err);
        return new ApiError("Internal Server Error", 500);
    }
}

export const updateProfile = async(req, res) => {
try {
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic) return new ApiError("Please upload a profile picture", 400);

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {
        profilePic: uploadResponse.secure_url
    }, {new: true}
)
    res.status(200).json(updatedUser);
    
}catch(err) {
    console.log("Update profile error: ", err);
    return new ApiError("Internal Server Error", 500);
}
}

export const checkAuth = async(req, res) => {
    try {
        res.status(200).json(req.user);
    }catch(err) {
        console.log("Check auth error: ", err);
        return new ApiError("Internal Server Error", 500);
    }
}