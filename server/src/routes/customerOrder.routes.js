import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createOrder, customerOrderHistory, findOrderById } from '../controllers/order.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createOrder);
router.route('/customer').get(verifyJWT, customerOrderHistory);
router.route('/:id').get(verifyJWT, findOrderById);

export default router;
