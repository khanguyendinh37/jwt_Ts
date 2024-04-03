"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class RefrechToken extends mongoose_1.Document {
    constructor(username, token) {
        super();
        this._username = username;
        this._token = token;
    }
    get username() {
        return this._username;
    }
    set username(username) {
        this._username = username;
    }
    get token() {
        return this._token;
    }
    setToken(token) {
        if (token.length < 100 || token.length > 400) {
            throw new Error('Độ dài của token phải từ 100 đến 400 ký tự.');
        }
        this._token = token;
    }
}
const tokenSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 20,
        unipue: true
    },
    token: {
        type: String,
        required: false,
        minlength: 100,
        maxlength: 400,
        unipue: true
    }
}, { timestamps: true });
const RefrechTokenModel = (0, mongoose_1.model)("refrechtokens", tokenSchema);
exports.default = RefrechTokenModel;
//# sourceMappingURL=RefrechToken.js.map