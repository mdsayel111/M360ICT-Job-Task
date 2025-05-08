"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const knexConfig = {
    development: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
            acquireTimeoutMillis: 30000,
            createTimeoutMillis: 3000,
            idleTimeoutMillis: 30000,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./migrations",
            extension: "ts",
        },
    },
};
exports.default = knexConfig;
