import { Router, application } from 'express';
import { checkout, paymentUpdate } from '../controllers/payments';
import { verifyJwt } from '../middleware/verifyJwt';
import express from 'express';

const router = Router();

router.use(verifyJwt);

router.post('/:userId/checkout', checkout);

router.post(
  '/payment/webhook',
  express.raw({ type: 'application/json' }),
  paymentUpdate
);

export default router;
