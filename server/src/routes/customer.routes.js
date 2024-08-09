import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  loginCustomer,
  logoutCustomer,
  refreshAccessToken,
  registerCustomer,
  getUserDetails,
} from '../controllers/customer.controller.js';

const router = Router();

router.route('/register').post(registerCustomer);
router.route('/login').post(loginCustomer);
router.route('/logout').post(verifyJWT, logoutCustomer);
router.route('/details').get(verifyJWT, getUserDetails);
router.route('/refresh-token').post(refreshAccessToken);

export default router;
