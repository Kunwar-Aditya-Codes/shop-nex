import { Router } from 'express';
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from '../controllers/customer';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router
  .route('/profile')
  .get(verifyJwt, getProfile)
  .patch(verifyJwt, updateProfile)
  .delete(verifyJwt, deleteProfile);

export default router;
