'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/utils/ApiClient';
import { Cart } from '@/types/cart';
import Image from 'next/image';
import { Product } from '@/types/product';
import PlaceOrder from './PlaceOrder';

export default function CartList() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [itemQuantity, setItemQuantity] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await apiClient.get('/cart/list');
      setCart(response.data);

      const products = response.data.products;
      products.forEach((product: Product) => {
        setItemQuantity((prev) => ({ ...prev, [product._id]: 1 }));
      });
    } catch (err) {
      console.log('err', err);
      setError('Failed to load cart items');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    setItemQuantity((prev) => ({ ...prev, [itemId]: newQuantity }));
  };

  const removeItem = async (productId: string) => {
    try {
      await apiClient.delete(`/cart/remove-product/${productId}`);
      fetchCartItems();
    } catch (err) {
      console.log('err', err);
      setError('Failed to remove item');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (cart?.products.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const total = cart?.products.reduce((sum, item) => sum + item.price * itemQuantity[item._id], 0);

  return (
    <div className="bg-white rounded-lg shadow">
      <ul className="divide-y divide-gray-200">
        {cart?.products.map((item) => (
          <li key={item._id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  width={64}
                  height={64}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item._id, Math.max(0, itemQuantity[item._id] - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1">{itemQuantity[item._id]}</span>
                <button
                  onClick={() => updateQuantity(item._id, itemQuantity[item._id] + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <span className="font-medium">Total:</span>
          <span className="font-bold ms-2">${total?.toFixed(2)}</span>
          <div className="ms-auto">{cart && <PlaceOrder cart={cart} quantity={itemQuantity} />}</div>
        </div>
      </div>
    </div>
  );
}
