const jwt=require("jsonwebtoken");
const User = require("../models/auth.model");

const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            res.status(500).json({message: "User unauthenticated- Token missing!"})
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(500).json({message: "User unauthenticated- Invalid token!"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(500).json({message: "user unauthenticated- Invalid token!"})
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in protected route",error.message)
        res.status(500).json({message: "Internal server error!"})
    }
}

module.exports=protectRoute