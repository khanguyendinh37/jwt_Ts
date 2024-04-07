import { Request ,Response,Express} from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefrechToken from "../models/RefrechToken";



export const registerUser = async (req:Request,res:Response)=>{
    try{
        const {username,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
       
       
        const user = new User ({
                username: username,
                email: email,
                password:hashPassword
            });
         const newUser = await user.save();
         res.status(200).json(newUser);

    }catch(err){
        res.status(500).json(err);
    }
};
export const loginUser = async (req: Request , res: Response) =>{
    try{
        
        const {username , password} = req.body;
         
        const user = await User.findOne({username:username});
      
        if(!user){
            return res.status(409).json("User does not exist");
        }
        const validPassword = await bcrypt.compare (
            password,
            user.password
        );
        if (!validPassword){
            return res.status(404).json('wrong password');
        }
        if (user && validPassword){
            //Create tokens to control user authorization =>tạo token kiểm soát đăng nhập phân quyền người dùng 
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefrechToken(user);
            //save token in database
            const usernameOld = await RefrechToken.findOne({username:username});
            if(!usernameOld){
                const token = new RefrechToken({
                    username : user.username,
                    token : refreshToken
                })
                token.save();
            }else{
                await RefrechToken.deleteOne({username:usernameOld.username})
                const token = new RefrechToken({
                    username : user.username,
                    token : refreshToken
                })
                 token.save();//todo
            }
            //save refrech Token in cookies
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                //set lại true khi deploy code
                secure:false,
                path:'/',
                sameSite:'strict'
            })
            //remove password
            const {_doc:{password,...rest}} = user as any;
            return res.status(200).json({...rest,accessToken});
        }

    }catch(err)
    {
        return res.status(500).json(err);
    }
};
//resetToken
export const resetToken = async (req:Request ,res :Response) =>{
    try {
         //take refresh Token from User
       
         const refreshToken:any =  req.cookies.refreshToken;
         const token = await RefrechToken.findOne({token:refreshToken});
       
         
         if(!refreshToken) return res.status(401).json("you're not authentiacated");
        
         if(!token){
            return res.status(403).json("refresh token is not valid");
         }  
        //  await RefrechToken.deleteOne({username:});
         jwt.verify(refreshToken,process.env.JWT_REFRECH_KEY,async (err:any,user:any)=>{
            if(err){
                console.log(err);
            }
         
            //Create new accessToken, refresh token
            const newAccessToken = generateAccessToken(user);
            const newRefrechToken = generateRefrechToken(user);
            
            //save new token
            await  RefrechToken.updateOne({username : token.username},{token:newRefrechToken});
          
            //Save in cookies
            res.cookie("refreshToken",newRefrechToken,{
                httpOnly:true,
                secure : false,// set it to True  when go to live
                path:"/",
                sameSite:"strict"
            });//todo
            
            res.status(200).json({accessToken:newAccessToken});
        })
        
    } catch (error) {
        return res.status(500).json(error)
    }
};
export const logOut = async(req:Request,res:Response)=>{
    try{
        res.clearCookie("refreshToken");
        const token = req.cookies.refreshToken;
        await RefrechToken.deleteOne({token:token});
        return res.status(200).json("logout successfuly!");

    }catch (err){
        return res.status(500).json(err);
    }
}
// Access token
const generateAccessToken =(user:any):string =>{
    return jwt.sign(
        {
            id:user.id,
            admin:user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {
           //date time
           expiresIn : '24h'
        }
    );
};
//Renfrech token
const generateRefrechToken = (user:any):string =>{
    return jwt.sign(
        {
            id:user.id,
            admin:user.admin
        },
        process.env.JWT_REFRECH_KEY,
        {
           //date time
           expiresIn : '365d'
           
        }
    );
};