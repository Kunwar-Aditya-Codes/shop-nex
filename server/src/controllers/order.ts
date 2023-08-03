import Order from '../models/order';
import { Request, Response } from 'express';

/**
 * @description Create a new order
 * @access private
 * @route POST /api/v1/order/:userId/create
 * @param { } customer
 * @param { } data
 * @returns { success, message, order } res
 */
export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const newOrder = await Order.create({
    customerId: userId,
    ...req.body,
  });

  if (!newOrder) {
    return res.status(400).json({
      success: false,
      message: "Can't create order!",
    });
  }

  return res.status(200).json({
    success: true,
    newOrderId: newOrder._id,
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

  const orders = await Order.find({
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
 * @description Get order with orderId
 * @access private
 * @route GET /api/v1/order/:orderId
 * @param { orderId } req
 * @returns { success, message, order } res
 */
export const getOrderDetails = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate('orderItems')
    .lean()
    .exec();

  return res.status(200).json({
    success: true,
    message: 'order retrieved successfully',
    order,
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
