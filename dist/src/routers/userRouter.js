"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userContronller_1 = require("../controllers/userContronller");
const authMidleware_1 = __importDefault(require("../middlware/authMidleware"));
const userRouter = (0, express_1.Router)();
//List user
userRouter.get("/", authMidleware_1.default.verifyToken, userContronller_1.getListUser);
//get User
userRouter.get("/:id", authMidleware_1.default.verifyToken, userContronller_1.getUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map