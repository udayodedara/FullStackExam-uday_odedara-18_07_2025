import { pool } from '../config/postgres';

export interface IOrderItem {
  id: number;
  order_id: number;
  product_id: string;
  quantity: number;
  price: number;
  created_at: Date;
}

export const createOrderItemTable = async (): Promise<void> => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.error('Error creating order items table:', error);
    throw error;
  }
};
