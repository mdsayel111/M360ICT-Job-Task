import { Knex } from "knex";
import config from "../config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: config.db,
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
