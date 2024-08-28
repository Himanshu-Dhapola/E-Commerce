import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import customerRouter from './routes/customer.routes.js';
import adminRouter from './routes/adminOrder.routes.js';
import cartRouter from './routes/cart.routes.js';
import cartItemRouter from './routes/cartItem.routes.js';
import customerProductRouter from './routes/customerProduct.routes.js';
import adminProductRouter from './routes/adminProduct.routes.js';
import orderRouter from './routes/customerOrder.routes.js';
import adminOrderRouter from './routes/adminOrder.routes.js';
import paymentRouter from './routes/payment.routes.js';

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/products', customerProductRouter);
app.use('/api/v1/admin/products', adminProductRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/cart_items', cartItemRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/admin/orders', adminOrderRouter);
app.use('/api/v1/payment', paymentRouter);

export { app };
