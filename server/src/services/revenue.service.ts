import { pool } from '../config/postgres';

interface Revenue {
  order_date: string;
  daily_revenue: number;
}

interface TopSender {
  name: string;
  user_id: number;
  total_spent: number;
}

export const getLast7DaysRevenue = async (): Promise<Revenue[]> => {
  const query = `
    SELECT 
        DATE(created_at) AS order_date,
        SUM(total_amount)::numeric(10, 2) AS daily_revenue
    FROM orders
    WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
    GROUP BY order_date
    ORDER BY order_date;`;
  const result = await pool.query(query);
  return result.rows;
};

export const getTopSpendersList = async (): Promise<TopSender[]> => {
  const query = `
    SELECT 
        u.name,
        o.user_id,
        SUM(oi.quantity * oi.price)::numeric(10, 2) AS total_spent
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN users u on o.user_id = u.id 
    GROUP BY o.user_id, u.name
    ORDER BY total_spent DESC
    LIMIT 3;`;
  const result = await pool.query(query);
  return result.rows;
};
