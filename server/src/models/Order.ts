import { pool } from '../config/postgres';

export interface IOrder {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  created_at: Date;
}

export const createOrderTable = async (): Promise<void> => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.error('Error creating orders table:', error);
    throw error;
  }
};
