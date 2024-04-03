import { Router } from "express";
import { getListUser,deleteUser,getUser,updateUser } from "../controllers/userContronller";
import middiewereController from "../middlware/authMidleware";
const userRouter = Router();

//List user
userRouter.get("/",middiewereController.verifyToken,getListUser);

//get User
userRouter.get("/:id",middiewereController.verifyToken,getUser);

//delete User
userRouter.delete("/:id",middiewereController.verifyTokenAdminAuth,deleteUser);

//upadate User 
userRouter.put("/:id",middiewereController.verifyTokenAdminAuth,updateUser);
export default userRouter;