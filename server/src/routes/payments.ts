import { Router } from 'express';
import { checkout } from '../controllers/payments';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.use(verifyJwt);

router.post('/:userId/checkout', checkout);

export default router;
