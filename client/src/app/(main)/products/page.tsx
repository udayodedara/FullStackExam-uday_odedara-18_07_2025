import { ProductResponse } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 8;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const currentPage = Number(page) || 1;

  const res: ProductResponse = await fetch(`${baseUrl}/product/list?page=${currentPage}&limit=${ITEMS_PER_PAGE}`).then(
    (res) => res.json(),
  );

  const totalPages = Math.ceil(res.total / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading products...</div>}>
          {res.products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={product.imageUrl}
                  height={100}
                  width={100}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">{product.category.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Suspense>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={`/products?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={`/products?page=${pageNum}`}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === pageNum ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {pageNum}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
