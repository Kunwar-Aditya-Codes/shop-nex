import Order from '../models/order';
import Product from '../models/product';
import { Request, Response } from 'express';
import { updateStock } from '../utils/updateStock';

/**
 * @description Create a new order
 * @access private
 * @route POST /api/v1/order/:userId/create
 * @param { userId , totalAmount , shippingAddress , cartItems  , paymentId } req
 * @returns { success, message, order } res
 */
export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { cartItems, totalAmount, shippingAddress } = req.body;

  if (!totalAmount || !shippingAddress || cartItems.length === 0 || !userId) {
    return res.status(403).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const order: any = await Order.create({
    userId,
    totalAmount,
    shippingAddress,
  });

  for (const cartItem of cartItems) {
    const { productId, quantity } = cartItem;

    const foundProduct = await Product.findOne({
      where: { productId },
    });

    await order.addProduct(foundProduct, {
      through: { quantity },
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Order created successfully',
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

  const orders = await Order.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        attributes: ['productId', 'productName'],
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  });

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

  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        attributes: ['productId', 'productName'],
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  });

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

  const order = await Order.findOne({
    where: { orderId },
  });

  if (!order) {
    return res.status(403).json({
      success: false,
      message: 'Order not found',
    });
  }

  order.orderStatus = status;
  await order.save();

  if (status === 'DISPATCHED') {
    await updateStock({
      orderId,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
  });
};
