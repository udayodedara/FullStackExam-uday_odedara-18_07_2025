import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, categoryId, description, imageUrl } = req.body;
    const product = await productService.createProduct({
      name,
      price,
      category: categoryId,
      description,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, search } = req.query;
    const products = await productService.getAllProducts({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching product', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
};
