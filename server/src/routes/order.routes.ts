import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  deleteOrder,
  getOrderList,
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/place-order', authMiddleware, createOrder);
router.get('/list', authMiddleware, getOrderList);
router.get('/details/:id', authMiddleware, getOrderById);
router.delete('/:id', deleteOrder);

export default router;
