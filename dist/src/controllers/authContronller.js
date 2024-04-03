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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.resetToken = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefrechToken_1 = __importDefault(require("../models/RefrechToken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({
            username: username,
            email: email,
            password: hashPassword
        });
        const newUser = yield user.save();
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username: username });
        if (!user) {
            return res.status(409).json("User does not exist");
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json('wrong password');
        }
        if (user && validPassword) {
            //Create tokens to control user authorization =>tạo token kiểm soát đăng nhập phân quyền người dùng 
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefrechToken(user);
            //save token in database
            const usernameOld = yield RefrechToken_1.default.findOne({ username: username });
            if (!usernameOld) {
                const token = new RefrechToken_1.default({
                    username: user.username,
                    token: refreshToken
                });
                token.save();
            }
            else {
                yield RefrechToken_1.default.deleteOne({ username: usernameOld.username });
                const token = new RefrechToken_1.default({
                    username: user.username,
                    token: refreshToken
                });
                token.save();
            }
            //save refrech Token in cookies
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                //set lại true khi deploy code
                secure: false,
                path: '/',
                sameSite: 'strict'
            });
            //remove password
            const _a = user._doc, { password } = _a, rest = __rest(_a, ["password"]);
            return res.status(200).json(Object.assign(Object.assign({}, rest), { accessToken }));
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.loginUser = loginUser;
//resetToken
const resetToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //take refresh Token from User
        const refreshToken = req.cookies.refreshToken;
        const token = yield RefrechToken_1.default.findOne({ token: refreshToken });
        if (!refreshToken)
            return res.status(401).json("you're not authentiacated");
        console.log(token);
        if (!token) {
            return res.status(403).json("refresh token is not valid");
        }
        //  await RefrechToken.deleteOne({username:});
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRECH_KEY, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            //Create new accessToken, refresh token
            const newAccessToken = generateAccessToken(user);
            const newRefrechToken = generateRefrechToken(user);
            //save new token
            yield RefrechToken_1.default.updateOne({ username: token.username }, { token: newRefrechToken });
            //Save in cookies
            res.cookie("refreshToken", newRefrechToken, {
                httpOnly: true,
                secure: false, // set it to True  when go to live
                path: "/",
                sameSite: "strict"
            });
            res.status(200).json({ accessToken: newAccessToken });
        }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.resetToken = resetToken;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken");
        const token = req.cookies.refreshToken;
        yield RefrechToken_1.default.deleteOne({ token: token });
        return res.status(200).json("logout successfuly!");
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.logOut = logOut;
// Access token
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        admin: user.admin
    }, process.env.JWT_ACCESS_KEY, {
        //date time
        expiresIn: '24h'
    });
};
//Renfrech token
const generateRefrechToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        admin: user.admin
    }, process.env.JWT_REFRECH_KEY, {
        //date time
        expiresIn: '365d'
    });
};
//# sourceMappingURL=authContronller.js.map