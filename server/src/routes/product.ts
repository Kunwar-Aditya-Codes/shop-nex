import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/product';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.route('/admin/create').post(verifyJwt, createProduct);
router
  .route('/admin/:productId')
  .patch(verifyJwt, updateProduct)
  .delete(verifyJwt, deleteProduct);

router.route('/all').get(getAllProducts);
router.route('/:productId').get(getSingleProduct);

export default router;
