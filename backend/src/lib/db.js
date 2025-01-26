import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { ApiError } from './apiError.js';

export const connectDB = async() => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err) {
        return new ApiError("Database connection error", 500);
    }
}