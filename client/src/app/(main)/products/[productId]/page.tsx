import AddToCartButton from '@/components/AddToCartButton';
import { Product } from '@/types/product';
import Image from 'next/image';

export const metadata = {
  title: 'Product Details',
  description: 'Product Details',
};

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('productId', productId);
  const product = await fetch(`${baseUrl}/product/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const productData: Product = await product.json();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={productData.imageUrl}
              alt={productData.name}
              width={500}
              height={500}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {productData.category.name}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{productData.name}</h1>
            <p className="mt-4 text-2xl text-gray-900">${productData.price.toFixed(2)}</p>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">{productData.description}</p>
            <div className="mt-8">
              <AddToCartButton productId={productData._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
