import { Client } from "pg";
import config from "../config";

const client = new Client(config.db_url as string);

export default client;
