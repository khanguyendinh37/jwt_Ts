"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./src/database"));
const app_1 = __importDefault(require("./src/sever/app"));
function start() {
    (0, database_1.default)();
    app_1.default.connectSever();
    app_1.default.routerUse();
}
start();
//# sourceMappingURL=index.js.map