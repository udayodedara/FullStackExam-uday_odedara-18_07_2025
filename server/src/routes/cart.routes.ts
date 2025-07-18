import { Router } from 'express';
import {
  addProductToCart,
  createCart,
  getUserCartsList,
  removeProductFromCart,
  clearCart,
} from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', createCart);
router.get('/list', authMiddleware, getUserCartsList);
router.post('/add-product/:productId', authMiddleware, addProductToCart);
router.delete('/remove-product/:productId', authMiddleware, removeProductFromCart);
router.delete('/clear', authMiddleware, clearCart);

export default router;
