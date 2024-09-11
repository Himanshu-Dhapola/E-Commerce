import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/index.js';
import customerRouter from './routes/customer.routes.js';
import cartRouter from './routes/cart.routes.js';
import cartItemRouter from './routes/cartItem.routes.js';
import customerProductRouter from './routes/customerProduct.routes.js';
import adminProductRouter from './routes/adminProduct.routes.js';
import orderRouter from './routes/customerOrder.routes.js';
import paymentRouter from './routes/payment.routes.js';
import orderHistoryRouter from './routes/orderHistory.routes.js';

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Root route is working!');
});

app.listen(process.env.PORT, () => console.log("Server ready on port 3000."));

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/products', customerProductRouter);
app.use('/api/v1/admin/products', adminProductRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/cart_items', cartItemRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/order_history', orderHistoryRouter);


export default app;

