import { Router } from 'express';
import { verifySuccessToken } from '../controllers/success';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/success', verifyJwt, verifySuccessToken);

export default router;
