import express from "express"
import upload from '../utils/multer.js'
import authMiddleware from "../utils/jwtVerification.js";

import { create, deleteUser, getAllUsers, getUserById, update, login } from "../controller/userController.js"

const userRoute = express.Router();

userRoute.post("/signup",create);
userRoute.post("/login",login)
userRoute.put('/update/:id',authMiddleware,upload.single('profilePicture'), update);


export default userRoute;