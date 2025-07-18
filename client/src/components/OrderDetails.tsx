'use client';

import { IOrderDetails } from '@/types/order';
import apiClient from '@/utils/ApiClient';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderDetailsV() {
  const { orderId } = useParams();
  const [data, setData] = useState<IOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const order = await apiClient.get(`/order/details/${orderId}`);
      setData(order.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No data found</div>;

  const { order, orderItems, products } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>

      <div className="mb-6 border rounded p-4">
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.total_amount}
        </p>
        <p>
          <strong>Ordered At:</strong> {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <div className="space-y-4">
        {orderItems.map((item) => {
          const product = products.find((p) => p._id === item.product_id);
          return (
            <div key={item.id} className="flex border p-4 rounded gap-4">
              <Image
                src={product?.imageUrl || ''}
                alt={product?.name || ''}
                width={100}
                height={100}
                className="rounded object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{product?.name}</h3>
                <p>Category: {product?.category.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{Number(item.price) * item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
