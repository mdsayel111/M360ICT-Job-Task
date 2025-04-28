import { Knex } from "knex";
import config from "../config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: config.db,
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
      extension: "ts",
    },
  },
};

export default knexConfig;
