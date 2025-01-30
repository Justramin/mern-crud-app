import express from "express"

import { adminlogin, create, deleteUser, getAllUsers, getUserById, update } from "../controller/userController.js"
import authMiddleware from "../utils/jwtVerification.js";

const adminRoute = express.Router();

adminRoute.post('/login',adminlogin)
adminRoute.post ("/user",authMiddleware, create);
adminRoute.get("/users",authMiddleware,getAllUsers);
adminRoute.get('/user/:id',authMiddleware,getUserById);
adminRoute.put('/update/user/:id',authMiddleware,update);
adminRoute.delete('/delete/user/:id',authMiddleware,deleteUser);



export default adminRoute;