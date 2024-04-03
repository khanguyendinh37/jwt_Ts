import User from "../models/User";
import bcrypt from "bcrypt";
import { Request,Response } from "express";
export const getListUser = async (req:Request,res:Response) =>{
    try {
        const listUser = await User.find();
        const users = listUser.map(
            user => {
                 const {_doc:{password,...rest}} = user as any;
                return rest;
            }
        )
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getUser = async ( req:Request, res: Response)=>{
    try {
        const id = req.params.id;
        const user = await User.findById({_id:id});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteUser = async(req:Request,res:Response) => {
    try {
        const id =  req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({sccess:true});
    } catch ( err) {
        return res.status(500).json(err);
    }
};
export const updateUser = async (req:Request , res:Response) =>{
    try {
       
        const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const upuser = await new User({
                username: req.body.username,
                email :req.body.email,
                password: hashed,
                _id:req.params.id

            });
            const _id = req.params.id;
            try {
                // Cập nhật thông tin người dùng dựa trên ID
               
                const updatedUser = await User.findByIdAndUpdate(
                   _id, // ID của người dùng cần cập nhật
                    upuser, // Dữ liệu cập nhật
                    { new: true } // Tùy chọn để trả về người dùng đã được cập nhật
                );
                if (updatedUser) {
                    
                    return res.status(200).json(updatedUser);
                } else {
                  
                    return res.status(404).send('Không tìm thấy người dùng để cập nhật');
                }
            } catch (error) {
                
                return res.status(500).json(error);
            }
           
    } catch (error) {
        return res.status(500).json(error);
    }
};