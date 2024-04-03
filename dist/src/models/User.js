"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
userSchema.index({ username: 1, email: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map