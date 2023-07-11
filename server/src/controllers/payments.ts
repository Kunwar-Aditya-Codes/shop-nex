import { stripe } from '../config/stripe';
import Payment from '../models/payment';
import { Request, Response } from 'express';

/**
 * @description Create a payment instance
 * @access private
 * @route POST /api/v1/session/:userId/checkout
 * @param { products} req
 * @returns { success, message } res
 */
export const checkout = async (req: Request, res: Response) => {
  const { id } = req;
  const { userId } = req.params;

  if (!id || id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!',
    });
  }

  const { orderItems } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(203).json({
      success: false,
      message: 'No items!',
    });
  }

  const lineItems = orderItems.map((item: any) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:5173/orders/success',
    cancel_url: 'http://localhost:5173/orders/failed',
    line_items: lineItems,
    mode: 'payment',
  });

  return res.status(200).json({
    success: true,
    session,
  });
};
