import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  getAll,
  confirm,
  ship,
  deliver,
  cancel,
  delOrder,
} from '../controllers/adim.controller.js';

const router = Router();

router.route('/').get(verifyJWT, getAll);
router.route('/:orderId/confirmed').put(verifyJWT, confirm);
router.route('/:orderId/ship').put(verifyJWT, ship);
router.route('/:orderId/deliver').put(verifyJWT, deliver);
router.route('/:orderId/cancel').put(verifyJWT, cancel);
router.route('/:orderId/delete').put(verifyJWT, delOrder);

export default router;
