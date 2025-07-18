import { Product } from './product';

export interface Cart {
  _id: string;
  userId: number;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
