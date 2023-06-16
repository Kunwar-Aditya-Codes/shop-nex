import { Router } from 'express';
import {
  register,
  login,
  sendVerificationEmail,
  verifyEmail,
  adminLogin,
} from '../controllers/auth';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/sign_up', register);
router.post('/login', login);
router.post('/admin/sign_in', adminLogin);

router.post('/send_verification_email', verifyJwt, sendVerificationEmail);
router.post('/verify_email', verifyJwt, verifyEmail);

export default router;
