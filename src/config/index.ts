import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
console.log(dotenv.config({ path: __dirname + "/../../.env" }));
export default {
  port: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_DATABASE,
  },
};
