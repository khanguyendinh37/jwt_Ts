"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middiewereController = {
    // Xác minh Token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token không hợp lệ");
                }
                else {
                    req.user = user;
                    next();
                }
            });
        }
        else {
            res.status(401).json("Bạn chưa được xác thực");
        }
    },
    verifyTokenAdminAuth: (req, res, next) => {
        middiewereController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            }
            else {
                res.status(403).json("Bạn không được phép xóa người dùng khác");
            }
        });
    }
};
exports.default = middiewereController;
//# sourceMappingURL=authMidleware.js.map