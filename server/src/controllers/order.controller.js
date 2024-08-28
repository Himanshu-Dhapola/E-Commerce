import { Address } from '../models/address.model.js';
import { Order } from '../models/order.model.js';
import { OrderItem } from '../models/orderItem.model.js';
import { Cart } from '../models/cart.model.js';

const findCustomerCart = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate(
    'cartItem'
  );
  if (!cart) {
    return res.status(401).json({
      success: false,
      message: 'Customer does not exist or cart is empty',
    });
  }
  return cart;
};

const createOrder = async (req, res) => {
  try {
    const customer = req.customer;
    const shippingAddress = req.body;
    let address;


    if (shippingAddress.id) {
      let existsAddress = await Address.findById(shippingAddress.id);
      address = existsAddress;
    } else {
      address = await Address.create(shippingAddress);
      address.customer = customer;
      await address.save();
      customer.address.push(address);
      await customer.save();
    }

    const cart = await findCustomerCart(customer._id);

    const orderItems = [];
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.cartItem) {
      const orderItem = await OrderItem.create({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        customer: customer._id,
        discountedPrice: item.discountedPrice,
      });
      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    const discount = totalPrice - totalDiscountedPrice;

    const createdOrder = await Order.create({
      customer: customer,
      orderItems,
      totalPrice,
      totalDiscountedPrice,
      discount,
      totalItem,
      shippingAddress: address,
    });

    const savedOrder = await createdOrder.save();

    return res.status(200).json({
      data: savedOrder,
      success: true,
      message: 'Order Created Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating order',
    });
  }
};

const placeOrder = async (orderId) => {
  const order = findOrderById(orderId);
  order.orderStatus = 'Placed';
  order.paymentDetails.status = 'Completed';
  return await order.save();
};

const confirmOrder = async (orderId) => {
  const order = findOrderById(orderId);
  order.orderStatus = 'Comfirmed';
  return await order.save();
};

const shipOrder = async (orderId) => {
  const order = findOrderById(orderId);
  order.orderStatus = 'Shipped';
  return await order.save();
};

const deliverOrder = async (orderId) => {
  const order = findOrderById(orderId);
  order.orderStatus = 'Delivered';
  return await order.save();
};

const cancelOrder = async (orderId) => {
  const order = findOrderById(orderId);
  order.orderStatus = 'Cancelled';
  return await order.save();
};

const findOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate({ path: 'customer', populate: { path: 'address' } })
      .populate({ path: 'orderItems', populate: { path: 'product' } })
      .populate('shippingAddress');

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'Cannot find order',
      });
    }

    return res.status(200).json({
      data: order,
      success: true,
      message: 'Order Found Successfully',
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: 'Something went wrong while finding order',
    });
  }
};

const customerOrderHistory = async (req, res) => {
  try {
    const customer = req.customer;
    const order = await Order.find({
      customer: customer._id,
      orderStatus: 'Placed',
    })
      .populate({ path: 'orderItems', populate: { path: 'product' } })
      .lean();

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong while acessing order history',
      });
    }

    return res.status(200).json({
      order,
      success: true,
      message: 'Order History Found Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while finding customer order history',
    });
  }
};

const getAllOrders = async () => {
  return await Order.find()
    .populate({ path: 'orderItems', populate: { path: 'product' } })
    .lean();
};

const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

export {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  customerOrderHistory,
  getAllOrders,
  deleteOrder,
  findOrderById,
};
