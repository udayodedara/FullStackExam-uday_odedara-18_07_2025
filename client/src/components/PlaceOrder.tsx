'use client';

import { Cart } from '@/types/cart';
import apiClient from '@/utils/ApiClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PlaceOrderProps {
  cart: Cart;
  quantity: Record<string, number>;
}

export default function PlaceOrder({ cart, quantity }: PlaceOrderProps) {
  const [loading, setLoading] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  const router = useRouter();
  const handlePlaceOrder = async () => {
    const orderItems = cart.products.map((product) => ({
      product_id: product._id,
      quantity: quantity[product._id],
    }));

    console.log('orderItems', orderItems);
    try {
      setLoading(true);

      await apiClient.post('/order/place-order', {
        order_items: orderItems,
      });

      await apiClient.delete('/cart/clear');

      setIsPlaced(true);

      router.push('/orders');
    } catch (error) {
      console.log('err', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlaceOrder}
      disabled={loading || isPlaced}
      className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded"
    >
      {loading ? 'Placing Order...' : isPlaced ? 'Order Placed' : 'Place Order'}
    </button>
  );
}
