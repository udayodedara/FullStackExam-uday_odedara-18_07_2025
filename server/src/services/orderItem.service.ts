import { IOrderItem } from '../models/OrderItem';
import { pool } from '../config/postgres';

interface IOrderItemCreate {
  order_id: number;
  product_id: string;
  quantity: number;
  price: number;
}

export const createOrderItem = async (orderItem: IOrderItemCreate): Promise<IOrderItem> => {
  try {
    const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`;
    const values = [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.price];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error creating order item');
  }
};

export const getOrderItemById = async (id: string): Promise<IOrderItem> => {
  try {
    const query = `SELECT * FROM order_items WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error fetching order item');
  }
};

export const getOrderItemByOrderId = async (orderId: string): Promise<IOrderItem[]> => {
  try {
    const query = `SELECT * FROM order_items WHERE order_id = $1`;
    const results = await pool.query(query, [orderId]);
    return results.rows;
  } catch {
    throw new Error('Error fetching order item');
  }
};

export const addProductToOrderItems = async (
  orderId: string,
  productId: string,
  quantity: number,
  price: number
): Promise<IOrderItem> => {
  try {
    const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`;
    const values = [orderId, productId, quantity, price];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error adding product to order');
  }
};

export const removeProductFromOrderItems = async (
  orderId: string,
  productId: string
): Promise<IOrderItem> => {
  try {
    const query = `DELETE FROM order_items WHERE order_id = $1 AND product_id = $2`;
    const values = [orderId, productId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error removing product from order');
  }
};

export const updateOrderItem = async (id: string, orderItem: IOrderItem): Promise<IOrderItem> => {
  try {
    const query = `UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, price = $4 WHERE id = $5`;
    const values = [
      orderItem.order_id,
      orderItem.product_id,
      orderItem.quantity,
      orderItem.price,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error updating order item');
  }
};

export const deleteOrderItem = async (id: string): Promise<IOrderItem> => {
  try {
    const query = `DELETE FROM order_items WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error deleting order item');
  }
};
