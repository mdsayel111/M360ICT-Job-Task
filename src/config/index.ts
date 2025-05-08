import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
console.log(dotenv.config({ path: __dirname + "/../../.env" }));
export default {
  port: process.env.PORT || 3000,
  db_url: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
