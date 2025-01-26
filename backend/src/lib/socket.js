import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
    });

    export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
    }


const userSocketMap = {}; 

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    socket.on("startTyping", (data) => {
        const receiverSocketId = userSocketMap[data.receiverId];
        if (receiverSocketId) {
            socket.to(receiverSocketId).emit("userStartedTyping", {
                senderId: data.senderId
            });
        }
    });

    socket.on("stopTyping", (data) => {
        const receiverSocketId = userSocketMap[data.receiverId];
        if (receiverSocketId) {
            socket.to(receiverSocketId).emit("userStoppedTyping", {
                senderId: data.senderId
            });
        }
    });
});

export { io, app, server };