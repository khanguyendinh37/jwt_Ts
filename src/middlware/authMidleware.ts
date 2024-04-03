import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const middiewereController = {
    // Xác minh Token
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.token as string | undefined;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string, (err: any, user: any) => {
                if (err) {
                    res.status(403).json("Token không hợp lệ");
                } else {
                    req.user = user;
                    
                    next();
                }
            });
        } else {
            res.status(401).json("Bạn chưa được xác thực");
        }
    },
    verifyTokenAdminAuth: (req: Request, res: Response, next: NextFunction) => {
        middiewereController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("Bạn không được phép xóa người dùng khác");
            }
        });
    }
};

export default middiewereController;
