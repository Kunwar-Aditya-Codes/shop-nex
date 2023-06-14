import { Router } from 'express';
import { register } from '../controllers/auth';

const router = Router();

router.post('/sign_up', register);

export default router;
