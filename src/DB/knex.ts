import knex from 'knex';
import config from './knexfile';
import { Knex } from 'knex';

const environment = process.env.NODE_ENV || 'development';

const db: Knex = knex(config[environment]);

export default db;
