"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorControllers_1 = require("../controllers/authorControllers");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const authorRouter = express_1.default.Router();
authorRouter
    .get("/", authMiddleware_1.default, authorControllers_1.getAllAuthors)
    .get("/:id", authMiddleware_1.default, authorControllers_1.getSingleAuthor)
    .post("/", authorControllers_1.createAuthor)
    .put("/:id", authMiddleware_1.default, authorControllers_1.updateSingleAuthor)
    .delete("/:id", authMiddleware_1.default, authorControllers_1.deleteSingleAuthor);
exports.default = authorRouter;
