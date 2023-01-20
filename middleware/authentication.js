const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = async(req,res,next)=>{
   try{
        const token = req.cookies.token
        if(!token){
            res.status(401).send("Not authorized")
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(verified.id).select("-password")
        if(!user){
            res.status(401).send({"msg":"token issues"})
        }
        req.user = user
        next()
   }
   catch(error){
    res.status(401).send({"msg":"middleWare failed"})
   }

}

module.exports = protect