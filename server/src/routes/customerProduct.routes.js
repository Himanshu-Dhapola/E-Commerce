import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  findProductById,
  searchProducts,
  categorySearch,
} from '../controllers/product.controller.js';

const router = Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(findProductById);
router.route('/search/:keyword').get(searchProducts);
router.route('/category/:keyword').get(categorySearch);

export default router;
