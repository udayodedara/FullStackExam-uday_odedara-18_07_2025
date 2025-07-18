'use client';

import apiClient from '@/utils/ApiClient';
import { useState } from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await apiClient.post(`/cart/add-product/${productId}`);
      setIsAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderButtonText = () => {
    if (loading) return 'Adding...';
    if (isAdded) return 'Added to Cart';
    return 'Add to Cart';
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || isAdded}
        className="bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
      >
        {renderButtonText()}
      </button>
    </div>
  );
}
