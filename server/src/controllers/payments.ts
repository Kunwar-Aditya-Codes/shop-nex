import { stripe } from '../config/stripe';
import Payment from '../models/payment';
import { Request, Response } from 'express';

// ! Check for webhook error

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

  const { orderItems, customerEmail } = req.body;

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
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `http://localhost:5173/orders/${1}`,
    cancel_url: 'http://localhost:5173/orders/failed',
    line_items: lineItems,
    mode: 'payment',
    customer_email: customerEmail,
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    billing_address_collection: 'required',
  });

  return res.status(200).json({
    success: true,
    session,
  });
};

/**
 * @description Update payment status
 * @access private
 * @route POST /api/v1/session/payment/webhook
 * @param { } req
 * @returns { success, message } res
 */

function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log('hello');
  console.log(paymentIntent);
  return;
}

export const paymentUpdate = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      'whsec_9e6281be3b2242fdcf838198c050a47f9b55c843a1d59dd2b41d1dd64e81de6b'
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      handlePaymentIntentSucceeded(paymentIntentSucceeded);
      break;

    case 'payment_intent.requires_action':
      console.log('hello');
      break;

    case 'payment_intent.created':
      console.log('hello created');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ success: true, event });
};
