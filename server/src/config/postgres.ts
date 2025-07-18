import { Pool, PoolConfig } from 'pg';
import { config } from './config';
import { createOrderTable } from '../models/Order';
import { createOrderItemTable } from '../models/OrderItem';
import { createUserTable } from '../models/User';

const postgresConfig: PoolConfig = {
  host: config.db.postgres.host,
  port: parseInt(config.db.postgres.port as string),
  database: config.db.postgres.database,
  user: config.db.postgres.user,
  password: config.db.postgres.password,
};

const pool = new Pool(postgresConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(1);
});

const connectPostgres = async (): Promise<void> => {
  try {
    await pool.connect();
    await createUserTable();
    await createOrderTable();
    await createOrderItemTable();
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export { pool, connectPostgres };
