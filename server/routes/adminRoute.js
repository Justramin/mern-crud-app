import express from "express"

import { create, deleteUser, getAllUsers, getUserById, update } from "../controller/userController.js"

const adminRoute = express.Router();

adminRoute.post ("/user",create);
adminRoute.get("/users",getAllUsers);
adminRoute.get('/user/:id',getUserById);
adminRoute.put('/update/user/:id',update);
adminRoute.delete('/delete/user/:id',deleteUser);



export default adminRoute;