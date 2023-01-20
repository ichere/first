import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { IS_TEST } from '../utils/config';

export const ESTABLISH_DB_CONNECTION = !IS_TEST;
const dbPort = IS_TEST ? process.env.DB_TEST_PORT : process.env.DB_PORT;

export const DATABASE = {
  port: parseInt(dbPort ?? '0', 10),
  host: process.env.DB_PROXY_HOST || process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
};

export const ORMCONFIG: PostgresConnectionOptions = {
  name: 'default',
  // logging: true,
  type: 'postgres',
  host: DATABASE.host,
  port: DATABASE.port,
  username: DATABASE.username,
  password: DATABASE.password,
  database: DATABASE.name,
  schema: 'public',
  synchronize: false,
  migrationsRun: false,
};
