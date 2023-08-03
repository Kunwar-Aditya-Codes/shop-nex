import { Router } from 'express';
import {
  getAllOrders,
  createOrder,
  getAllOrdersForAdmin,
  updateOrderStatus,
  getOrderDetails,
} from '../controllers/order';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.use(verifyJwt);

router.get('/:userId/all', getAllOrders);
router.post('/:userId/create', createOrder);
router.get('/:orderId', getOrderDetails);
router.get('/admin/view_all', getAllOrdersForAdmin);
router.patch('/admin/:orderId/update_status', updateOrderStatus);

export default router;
