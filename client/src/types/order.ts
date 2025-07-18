import { Product } from './product';

export interface Order {
  id: number;
  user_id: number;
  status: 'pending' | 'completed' | 'cancelled';
  total_amount: string;
  created_at: string;
}

export interface IOrderDetails {
  order: Order;
  orderItems: OrderItem[];
  products: Product[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: string;
  quantity: number;
  price: string;
  created_at: string;
}
