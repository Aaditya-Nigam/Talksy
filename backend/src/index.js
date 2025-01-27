const express=require("express");
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")

const authRoute=require("./routers/auth.route");
const messageRoute=require("./routers/message.route");
const connectDB = require("./lib/db");

dotenv.config();
const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth/",authRoute);
app.use("/api/message/",messageRoute);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("server is running on port 5000");
    connectDB();
})
