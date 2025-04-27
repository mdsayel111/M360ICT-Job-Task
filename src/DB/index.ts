import { Client } from "pg";
import config from "../config";

const client = new Client(config.db);

export default client;
