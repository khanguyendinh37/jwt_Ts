import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../routers/authRouter";
import userRouter from "../routers/userRouter";
import morgan from "morgan";
import  helmet from "helmet";
import compression from "compression";
dotenv.config();
const app = express();

//init Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // log request details to console
app.use(helmet()); // set security headers
app.use(compression()); //compression middleware for optimizing performence


//init router
const connectSever = async ()=>{
    try {
        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        process.on("SIGINT",()=>{
            server.close(()=> console.log("exit server"));
        });
    } catch (error) {
        console.log(error);
    }

}
//use router
const routerUse = () =>{
    app.use("/ncc/auth",authRouter);
    app.use("/ncc",userRouter);
}
export default {connectSever,routerUse};