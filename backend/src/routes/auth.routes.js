import express from "express";
import {logOut, signIn, signUp, updateProfile, checkAuth} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();



router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', logOut);


router.put('/update-profile', protectRoute ,updateProfile);
router.get('/check', protectRoute, checkAuth);


export {router as authRoutes };