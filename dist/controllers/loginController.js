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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const knex_1 = __importDefault(require("../DB/knex"));
const loginSchema_1 = require("../lib/joi/loginSchema");
const catchAsyncMiddleware_1 = __importDefault(require("../middleware/HOF-middleware/catchAsyncMiddleware"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const appError_1 = __importDefault(require("../customClasses/appError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.login = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { error, value } = loginSchema_1.loginSchema.validate(data);
    // if data is not valid throw error
    if (error) {
        throw error;
    }
    const token = jsonwebtoken_1.default.sign(data, config_1.default.jwtSecret);
    // set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    const [author] = yield knex_1.default
        .select("*")
        .from("authors")
        .where({ name: data.name });
    if (!author) {
        throw new appError_1.default(404, "Author not found");
    }
    (0, sendResponse_1.default)(res, {
        message: "Login successfull",
        data: author || null,
    });
}));
