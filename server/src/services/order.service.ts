import { pool } from '../config/postgres';
import { IOrder } from '../models/Order';

interface IOrderCreate {
  user_id: number;
  status: string;
  total_amount: number;
}

export const createOrder = async (order: IOrderCreate): Promise<IOrder> => {
  try {
    const query = `INSERT INTO orders (user_id, status, total_amount) VALUES ($1, $2, $3) RETURNING *`;
    const values = [order.user_id, order.status, order.total_amount];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error creating order');
  }
};

export const getOrderById = async (id: string): Promise<IOrder> => {
  try {
    const query = `SELECT * FROM orders WHERE orders.id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error fetching order');
  }
};

export const deleteOrder = async (id: string): Promise<IOrder> => {
  try {
    const query = `DELETE FROM orders WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error deleting order');
  }
};

export const getOrderList = async (userId: number): Promise<IOrder[]> => {
  try {
    const query = `SELECT * FROM orders WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch {
    throw new Error('Error fetching order list');
  }
};
