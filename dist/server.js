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
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
// handle unhandleRejection
process.on("unhandledRejection", () => {
    // close all connection
    server.closeAllConnections();
    // turn off the server
    server.close(() => {
        console.log("Unhandle rejection and turn off the server !");
        process.exit(1);
    });
});
// handle uncaughtException
process.on("uncaughtException", () => {
    console.log("Uncaught exception !");
    process.exit(1);
});
let server;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    server = routes_1.default.listen(config_1.default.port, () => {
        console.log(`server is running on port ${config_1.default.port}`);
    });
});
main()
    .then(() => console.log("successfully connected"))
    .catch((err) => console.log(err));
