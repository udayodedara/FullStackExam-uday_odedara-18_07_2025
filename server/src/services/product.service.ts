import Product, { IProduct } from '../models/Product';

interface IProductCreate {
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export const createProduct = async (product: IProductCreate): Promise<IProduct> => {
  const newProduct = await Product.create(product);
  return newProduct;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const product = await Product.findById(id).populate('category');
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const getAllProducts = async ({
  search,
  page,
  limit,
}: {
  category?: string;
  search?: string;
  page: number;
  limit: number;
}): Promise<{ products: IProduct[]; total: number }> => {
  const filter: any = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
  }
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter).populate('category').skip(skip).limit(limit);

  return { products, total };
};

export const updateProduct = async (id: string, product: IProduct): Promise<IProduct> => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
  if (!updatedProduct) {
    throw new Error('Product not found');
  }
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<IProduct> => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error('Product not found');
  }
  return deletedProduct;
};
