"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authContronller_1 = require("../controllers/authContronller");
const authRouter = (0, express_1.Router)();
// Register
authRouter.post("/register", authContronller_1.registerUser);
//login
authRouter.post("/login", authContronller_1.loginUser);
//Reset Token
authRouter.post("/reset", authContronller_1.resetToken);
//logout 
authRouter.post("/logout", authContronller_1.logOut);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map