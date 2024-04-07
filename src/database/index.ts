import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();



const connectDB = async () => {//todo
    try {
        const MongoDB =  await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB Connected');
        process.on("SIGINT",()=>{
            MongoDB.disconnect();
            console.log("MongoDB disConnect!");
        });
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
}

export default connectDB;