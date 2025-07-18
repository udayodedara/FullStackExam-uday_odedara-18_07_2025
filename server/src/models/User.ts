import { pool } from '../config/postgres';

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  created_at: Date;
}

export const createUserTable = async (): Promise<void> => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255)  NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};
