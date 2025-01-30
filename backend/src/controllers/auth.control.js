const v2 = require("../lib/cloudinary");
const generateToken = require("../lib/utils");
const User=require("../models/auth.model")
const bcrypt=require("bcrypt")

const authSignUp=async (req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            res.status(500).json({message: "Fields are missing!"});
            return ;
        }
        if(password.length<6){
            res.status(400).json({message: "Password must be atleast 6 characters!"})
            return ;
        }
        const user=await User.findOne({email});
        if(user){
            res.status(400).json({message: "Email already exists!"})
            return ;
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({message: "Invalid user data!"});
        }
    }catch(err){
        console.log("Error in signup controller",err.message)
        res.status(404).json({message: "Internal server error!"})
    }
}

const authLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            res.status(500).json({message: "Fields are missing!"});
            return ;
        }
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({message: "Invalid credentials!"});
            retrun ;
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword){
            res.status(400).json({message: "Invalid credentials!"});
            return ;
        }
        generateToken(user._id,res);
        res.status(201).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        })

    } catch (error) {
        console.log("Error  in login controller",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const authLogout=(req,res)=>{
    res.cookie('jwt',"",{
        maxAge: 0
    })
    res.status(201).json({message: "Logout successfully!"})
}

const authUpdateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body;
        if(!profilePic){
            res.status(500).json({message: "Profile pic is required!"})
        }
        const userId=req.user._id;
        const updatedResponse=v2.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId, {profilePic:updatedResponse.secure_url},{new:tue})
        res.status(201).json(updatedUser)
    } catch (error) {
        console.log("Error in updating profile pic",error.message)
        res.status(500).json({message: "Internal server error!"})
    }
}

const authCheck=(req,res)=>{
    try {
        res.status(201).json(req.user)
    } catch (error) {
        console.log("Error in chek auth",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports={
    authSignUp,
    authLogin,
    authLogout,
    authUpdateProfile,
    authCheck
}