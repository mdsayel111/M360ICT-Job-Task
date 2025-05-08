"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorRoutes_1 = __importDefault(require("./authorRoutes"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandleMiddleware_1 = __importDefault(require("../middleware/globalErrorHandleMiddleware"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const loginRoutes_1 = __importDefault(require("./loginRoutes"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// config cors
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("Hello from Express");
});
app.use("/authors", authorRoutes_1.default);
app.use("/books", authMiddleware_1.default, bookRoutes_1.default);
app.use("/login", loginRoutes_1.default);
// add global error handler
app.use(globalErrorHandleMiddleware_1.default);
exports.default = app;
