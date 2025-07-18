import { Response } from 'express';
import * as cartService from '../services/cart.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const createCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const cart = await cartService.createCart(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error creating cart', error });
  }
};

export const getUserCartsList = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const cart = await cartService.getUserCartsList(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching cart', error });
  }
};

export const addProductToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { productId } = req.params;
    const cart = await cartService.addProductToCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product to cart', error });
  }
};

export const removeProductFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { productId } = req.params;
    const cart = await cartService.removeProductFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error removing product from cart', error });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const cart = await cartService.clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error clearing cart', error });
  }
};
