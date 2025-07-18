import { Router } from 'express';
import { getLast7DaysRevenue, getTopSpendersList } from '../controllers/revenue.controller';

const router = Router();

router.get('/last-7-days-revenue', getLast7DaysRevenue);
router.get('/top-spenders-list', getTopSpendersList);

export default router;
