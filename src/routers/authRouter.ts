import { Router } from "express";
import { registerUser,loginUser,resetToken,logOut } from "../controllers/authContronller";

const authRouter = Router();
// Register
authRouter.post("/register",registerUser);

//login
authRouter.post("/login",loginUser);

//Reset Token
authRouter.post("/reset",resetToken);

//logout 
authRouter.post("/logout",logOut);

export default authRouter;