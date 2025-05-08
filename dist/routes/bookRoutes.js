"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const bookRouter = express_1.default.Router();
bookRouter
    .get("/", bookControllers_1.getAllbooks)
    .get("/:id", bookControllers_1.getSinglebook)
    .post("/", bookControllers_1.createbook)
    .put("/:id", bookControllers_1.updateSinglebook)
    .delete("/:id", bookControllers_1.deleteSinglebook);
exports.default = bookRouter;
