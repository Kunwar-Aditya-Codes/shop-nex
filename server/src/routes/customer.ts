import { Router } from 'express';
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from '../controllers/customer';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.use(verifyJwt);

router
  .route('/profile')
  .get(getProfile)
  .patch(updateProfile)
  .delete(deleteProfile);

export default router;
