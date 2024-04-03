"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unipue: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unipue: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=auth.js.map