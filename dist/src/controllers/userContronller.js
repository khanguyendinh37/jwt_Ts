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
exports.updateUser = exports.deleteUser = exports.getUser = exports.getListUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getListUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUser = yield User_1.default.find();
        const users = listUser.map(user => {
            const _a = user._doc, { password } = _a, rest = __rest(_a, ["password"]);
            return rest;
        });
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getListUser = getListUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield User_1.default.findById({ _id: id });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield User_1.default.deleteOne({ _id: id });
        return res.status(200).json({ sccess: true });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(req.body.password, salt);
        const upuser = yield new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
            _id: req.params.id
        });
        const _id = req.params.id;
        try {
            // Cập nhật thông tin người dùng dựa trên ID
            const updatedUser = yield User_1.default.findByIdAndUpdate(_id, // ID của người dùng cần cập nhật
            upuser, // Dữ liệu cập nhật
            { new: true } // Tùy chọn để trả về người dùng đã được cập nhật
            );
            if (updatedUser) {
                return res.status(200).json(updatedUser);
            }
            else {
                return res.status(404).send('Không tìm thấy người dùng để cập nhật');
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userContronller.js.map