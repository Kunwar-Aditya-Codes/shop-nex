import Order from '../models/order';
import { Request, Response } from 'express';

/**
 * @description Create a new order
 * @access private
 * @route POST /api/v1/order/:userId/create
 * @param { userId , totalAmount , shippingAddress , orderItems  , paymentId } req
 * @returns { success, message, order } res
 */
export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { orderItems, totalAmount, shippingAddress } = req.body;

  if (!totalAmount || !shippingAddress || orderItems.length === 0 || !userId) {
    return res.status(403).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const order = await Order.create({
    customerId: userId,
    totalAmount,
    orderStatus: 'PENDING',
    shippingAddress,
    deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    orderItems,
  });

  return res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
};

/**
 * @description Get all orders
 * @access private
 * @route GET /api/v1/order/:userId/all
 * @param { userId } req
 * @returns { success, message, orders } res
 */
export const getAllOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const orders = await Order.findOne({
    customerId: userId,
  })
    .populate('orderItems')
    .lean()
    .exec();

  return res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    orders,
  });
};

/**
 * @description Get all orders for admin
 * @access private
 * @route GET /api/v1/order/admin/view_all
 * @param { role } req
 * @returns { success, message, orders } res
 */
export const getAllOrdersForAdmin = async (req: Request, res: Response) => {
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const orders = await Order.find({}).populate('orderItems').lean().exec();

  return res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    orders,
  });
};

/**
 * @description Update order status
 * @access private
 * @route PATCH /api/v1/order/admin/:orderId/update_status
 * @param { role, orderId, status } req
 * @returns { success, message } res
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { role } = req;
  const { orderId } = req.params;
  const { status } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  if (!status) {
    return res.status(403).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus: status,
    },
    { new: true }
  )
    .lean()
    .exec();

  if (!updatedOrder) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
  });
};
