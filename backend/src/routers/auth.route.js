const express=require("express");
const router=express.Router();
const {authSignUp, authLogin, authLogout, authUpdateProfile, authCheck}=require("../controllers/auth.control");
const protectRoute = require("../middleware/auth.middleware");

router.post("/signUp",authSignUp)

router.post("/login",authLogin)

router.post("/logout",authLogout)

router.put("/update-profile",protectRoute,authUpdateProfile)

router.get("/check",protectRoute,authCheck)

module.exports=router