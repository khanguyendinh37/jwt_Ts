"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContronller = void 0;
const express_1 = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.authContronller = {
    //Register
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //mã hõa Mk
            const salt = yield bcrypt.genSalt(10);
            const hashed = yield bcrypt.hash(req.body.password, salt);
            // create new user
            const newUser = yield new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            //save to database
            const user = yield newUser.save();
            res.status(200), (0, express_1.json)(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    //Login
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json('wrong username!');
            }
            const validPassword = yield bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).json('wrong password');
            }
            if (user && validPassword) {
                res.status(200).json(user);
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    })
};
//# sourceMappingURL=authContronller.js.map