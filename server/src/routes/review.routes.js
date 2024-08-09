import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createReview,
  getAllReviews,
} from '../controllers/review.controller.js';

const router = Router();

router.route('/create').post(verifyJWT,createReview);
router.route('/product/:productId').get(verifyJWT, getAllReviews);

export default router;
