const express = require("express");
const router = express.Router();
require('dotenv').config()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
//const asyncHandler = require("express-async-handler")
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}


router.post("/register",async(req,res)=>{
   try{
        const {username,email,password,passwordConfirm} = req.body
        if(!username || !email || !password){
            res.send({"msg":"provide all the details"})
        }
        if(password.length < 8){
            res.send({"msg":"password is too short"})
        }
        const userExists = await User.findOne({email})
        if(userExists){
           res.status(400).send({"msg":"user already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        console.log(hashedPassword)
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
            passwordConfirm:hashedPassword
        })
        const token = generateToken(user._id)
        // res.cookie("token",token,{
        //     path:"/",
        //     httpOnly:true,
        //     expires:new Date(Date.now() + 1000 * 86400),
        //     sameSite:"none",
        //     secure:true
        // })
        res.cookie("token",token)
       console.log(req.cookies)

      let users = await user.save()
       res.send({"user":users,token:token})
       }
       catch(error){
       res.send({"error":error})
   }
})

router.post("/login",async(req,res)=>{
    try{

        const {email,password} = req.body
        if(!email || !password){
            res.send({"msg":"Please provide email and password"})
        }
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({"message":"Invalid credential"})
        }
        const passwordIsCorrect = await bcrypt.compare(password,user.password)
        
        if(user && passwordIsCorrect){
            res.send({"user":user})
        }

      }catch(error){
        return res.status(400).json(error)
      }

})



module.exports = router