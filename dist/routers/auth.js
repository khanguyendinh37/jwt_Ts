"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authContronller_1 = require("../controllers/authContronller");
const router = require("express").Router();
router.post("/register", authContronller_1.authContronller.registerUser);
router.post("/login", authContronller_1.authContronller.loginUser);
exports.default = router;
//# sourceMappingURL=auth.js.map