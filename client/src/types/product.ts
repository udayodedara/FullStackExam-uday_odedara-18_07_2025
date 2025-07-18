// types/product.ts

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
