const mongoose=require("mongoose")

const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongobd connected: ${connect.connection.host}`)
    } catch (error) {
        console.log("Error in connecting mongodb")
    }
}
module.exports=connectDB