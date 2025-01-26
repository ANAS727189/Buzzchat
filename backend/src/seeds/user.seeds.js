    import { config } from "dotenv";
    import { connectDB } from "../lib/db.js";
    import User from "../models/user.models.js";

    config();

    const seedUsers = [
    // Female Users
    {
        email: "rani@example.com",
        fullName: "Rani Mukherjee",
        password: "rani123",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "renu@example.com",
        fullName: "Renuka Verma",
        password: "renu123",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "kate@example.com",
        fullName: "Kate Perry",
        password: "kate123",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "anamika@example.com",
        fullName: "Anamika Singh",
        password: "anamika123",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "ishabrown@example.com",
        fullName: "Isha Brown",
        password: "isha123",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },

    // Male Users
    {
        email: "ram@example.com",
        fullName: "Ram Kumar Verma",
        password: "ram123",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "raj@example.com",
        fullName: "Raj Sharma",
        password: "raj123",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "antonio@example.com",
        fullName: "Antonio Brown",
        password: "antonio123",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "virat@example.com",
        fullName: "Virat Kohli",
        password: "virat123",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "matt@example.com",
        fullName: "Matt Jackson",
        password: "matt123",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    ];

    const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
    };

// Call the function
seedDatabase();