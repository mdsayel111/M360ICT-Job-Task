import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const knexConfig: { [key: string]: Knex.Config } = {
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

export default knexConfig;
