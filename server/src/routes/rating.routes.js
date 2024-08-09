import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createRating,
  getProductRating,
} from '../controllers/rating.controller.js';

const router = Router();

router.route('/create').post(verifyJWT, createRating);
router.route('/product/:productId').put(verifyJWT, getProductRating);

export default router;
