import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  findCustomerCart,
  addItemToCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.route('/').get(verifyJWT, findCustomerCart);
router.route('/add').put(verifyJWT, addItemToCart);

export default router;
