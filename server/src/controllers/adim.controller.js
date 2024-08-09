import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getAllOrders,
  shipOrder,
} from './order.controller.js';

const getAll = async (req, res) => {
  const order = getAllOrders();
  if (!order) {
    return res.status(400).json({
      success: false,
      message: 'Error in getting all Orders for admin',
    });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Got all products successfully' });
};

const confirm = async (req, res) => {
  const orderId = req.params.orderId;
  const order = confirmOrder(orderId);
  if (!order) {
    return res
      .staus(400)
      .json({ success: false, message: 'Error in confirming the order' });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Order confirmed' });
};

const ship = async (req, res) => {
  const orderId = req.params.orderId;
  const order = shipOrder(orderId);
  if (!order) {
    return res
      .staus(400)
      .json({ success: false, message: 'Error in shipping the order' });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Order shipped' });
};

const deliver = async (req, res) => {
  const orderId = req.params.orderId;
  const order = deliverOrder(orderId);
  if (!order) {
    return res
      .staus(400)
      .json({ success: false, message: 'Error in delivering the order' });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Order delivered' });
};

const cancel = async (req, res) => {
  const orderId = req.params.orderId;
  const order = cancelOrder(orderId);
  if (!order) {
    return res
      .staus(400)
      .json({ success: false, message: 'Error in cancelling the order' });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Order cancelled' });
};

const delOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const order = deleteOrder(orderId);
  if (!order) {
    return res
      .staus(400)
      .json({ success: false, message: 'Error in deleting the order' });
  }
  return res
    .status(200)
    .json({ order, success: true, message: 'Order deleted' });
};

export { getAll, confirm, ship, deliver, cancel, delOrder };
