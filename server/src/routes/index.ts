import { Router } from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import orderItemRoutes from './orderItem.routes';
import authRoutes from './auth.routes';
import cartRoutes from './cart.routes';
import categoryRoutes from './category.routes';
import revenueRoutes from './revenue.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/order-item', orderItemRoutes);
router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/category', categoryRoutes);
router.use('/revenue', revenueRoutes);

export default router;
