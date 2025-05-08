"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
console.log(dotenv_1.default.config({ path: __dirname + "/../../.env" }));
exports.default = {
    port: process.env.PORT || 3000,
    db_url: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
};
