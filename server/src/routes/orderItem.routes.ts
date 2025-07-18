import { Router } from 'express';
import {
  createOrderItem,
  getOrderItemById,
  getOrderItemByOrderId,
  addProductToOrderItems,
  removeProductFromOrderItems,
  updateOrderItem,
  deleteOrderItem,
} from '../controllers/orderItem.controller';

const router = Router();

router.post('/', createOrderItem);
router.get('/:id', getOrderItemById);
router.get('/order/:orderId', getOrderItemByOrderId);
router.post('/order/:orderId/product/:productId', addProductToOrderItems);
router.delete('/order/:orderId/product/:productId', removeProductFromOrderItems);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

export default router;
