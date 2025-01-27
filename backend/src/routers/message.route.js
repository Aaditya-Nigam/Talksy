const express=require("express");
const protectRoute = require("../middleware/auth.middleware");
const { getUserForSidebar, getMessages, sendMessage } = require("../controllers/message.control");

const router=express.Router();

router.get("/user",protectRoute,getUserForSidebar)

router.get("/:id",protectRoute,getMessages)

router.post("/send/:id",protectRoute,sendMessage)

module.exports=router