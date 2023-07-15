import { Router } from 'express';
import { checkout, paymentUpdate } from '../controllers/payments';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/:userId/checkout', verifyJwt, checkout);

router.post('/payment/webhook', paymentUpdate);

export default router;
