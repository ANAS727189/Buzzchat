import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {app, server} from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import path from "path";
const port  = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



import {authRoutes} from "./routes/auth.routes.js";
import { messageRoutes } from "./routes/message.routes.js";
import rateLimit from 'express-rate-limit';



const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many login attempts, please try again later',
});


app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/messages', messageRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    
        app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
        });
}


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});