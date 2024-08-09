import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createProduct,
  deleteProduct,
  updateProduct,
  createMultipleProducts,
} from '../controllers/product.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createProduct);
router.route('/create_multiple_product').post(verifyJWT, createMultipleProducts);
router.route('/:id').delete(verifyJWT, deleteProduct);
router.route('/:id').put(verifyJWT, updateProduct);

export default router;
