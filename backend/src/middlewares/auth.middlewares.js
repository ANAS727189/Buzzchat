import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../lib/apiError.js";


export const protectRoute = async(req, res, next) => {
    try {
        const token  = req.cookies.jwt;
        if(!token) return new ApiError("Unauthorized-Token not found", 401);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return new ApiError("Unauthorized-Token not valid", 401);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return new ApiError("Unauthorized-User not found", 401);
        req.user = user;
        next();
    }catch(err) {
        console.log("Protect route error: ", err);
        return new ApiError("Unauthorized-User not found", 401);
    }
}