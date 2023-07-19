const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");
require('dotenv').config()


const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
    try{
     const {name, email, password, city, DOB} = req.body;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(400).json({msg: "User already exist, please login"})
    }else{
      bcrypt.hash(password, 5, async(err, hash) => {
        if(err){
            res.status(400).json({error:err})
        }else{
            const user = new userModel({name, email, password:hash, city, DOB});
            await user.save();
            res.status(200).json({msg: "User has been registered", user: req.body})
        }
      })
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})


userRouter.post("/login", async(req,res) => {
    try{
      const {email, password} = req.body;
      const user = await userModel.findOne({email});
      if(!user){
        res.status(400).json({msg:"User doesn't exist"});
      }else{
        bcrypt.compare(password, user.password, (err, decode) => {
            if(decode){
                const token = jwt.sign({userId: user._id, name: user.name}, process.env.secretKey)
                res.status(200).json({msg: "Logged In!!", token});
            }else{
                res.status(400).json({error:err});
            }
        })
      }
    }catch(err){
        res.status(400).json({error:err});
    }
})




module.exports = {
    userRouter
}