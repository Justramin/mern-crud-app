import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import fs from "fs";

export const adminlogin = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || user.password !== password){
            return res.status(400).json({message:'Invalid email of password'});
        }
        if(user.isAdmin){
            const token = generateToken(user._id);
            res.status(200).json({success:true,token});
        }else{
            res.status(401).json({message:'you are not authorized'});
        }
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const create = async(req,res)=>{
    try {
        const newUser =new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:" User already exists. "})
        }
        await newUser.save();
        res.status(200).json({message:"User created Successfully."});
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};



export const getAllUsers = async(req,res)=>{
    try {
        const userData = await User.find();  
        if(!userData || userData.length === 0 ){
            return res.status(404).json({message : " User data not found. "});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
};



export const getUserById = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : " User not found. "});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};


export const update = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : " User not found. "});
        }

        if (req.file) {
            const imagepath = req.file.path.replace('/Users/justin/Desktop/MERN_CRUD/server/','http://localhost:8000/')
            await User.updateOne({email:req.body.email},{$set:{profilePicture:imagepath}})
        }
        

        const updatedUser = await User.updateOne(
            {email:req.body.email},
            {
                $set:{
                    name:req.body.name,
                    address: req.body.address
                }
            }
        );
        
        res.status(200).json({ message: "User Updated Successfully.", updatedUser });
    } catch (error) {
        console.log('error in the ',error)
        res.status(500).json({errorMessage: error.message})
    }
};


export const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : " User not found. "});
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({message:" User deleted succrssfully. "});
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
};

export const login = async(req,res)=>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const userdata ={
        _id:user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        profilePicture: user.profilePicture,
    }
    
    const token = generateToken(user._id);
    res.status(200).json({ token , userdata });

    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });
  };