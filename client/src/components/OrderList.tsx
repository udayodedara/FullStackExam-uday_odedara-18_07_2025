'use client';

import { Order } from '@/types/order';
import apiClient from '@/utils/ApiClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await apiClient.get('/order/list');
      setOrders(orders.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (orderId: number) => {
    router.push(`/order-details/${orderId}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (orders.length === 0) return <div>No orders found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="grid gap-4">
        {orders.map((order, index) => (
          <li key={order.id} className="flex items-center gap-8 border p-4 rounded">
            <h2 className="font-mono text-lg">{index + 1}</h2>
            <div className="flex gap-8 w-full items-center">
              <p>Status: {order.status}</p>
              <p>Total Amount: {order.total_amount}</p>
              <p>Created At: {new Date(order.created_at).toLocaleDateString()}</p>
              <button
                onClick={() => handleViewDetails(order.id)}
                className="bg-indigo-600 ms-auto text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
