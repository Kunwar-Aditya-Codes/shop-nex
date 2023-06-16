import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getAllOrdersForAdmin,
} from '../controllers/order';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.use(verifyJwt);

router.post('/:userId/create', createOrder);
router.get('/:userId/all', getAllOrders);
router.get('/admin/view_all', getAllOrdersForAdmin);

export default router;
