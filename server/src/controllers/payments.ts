import { stripe } from '../config/stripe';
import { Request, Response } from 'express';
import crypto from 'crypto';
import Success from '../models/success';
import Order from '../models/order';

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

  const { orderItems, customerEmail, orderId } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(203).json({
      success: false,
      message: 'No items!',
    });
  }

  const cartItems = orderItems.map((item: any) => item.id);

  const customer = await stripe.customers.create({
    email: customerEmail,
    metadata: {
      userId,
      cart: JSON.stringify(cartItems),
    },
  });

  const lineItems = orderItems.map((item: any) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const successToken = await crypto.randomBytes(32).toString('hex');

  await Success.create({
    token: successToken,
  });

  const session = await stripe.checkout.sessions.create({
    client_reference_id: orderId,
    success_url: `https://shop-nex.onrender.com/orders/success/${successToken}`,
    cancel_url: 'https://shop-nex.onrender.com/cart_orders',
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'inr',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 200 * 100,
            currency: 'inr',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items: lineItems,
    mode: 'payment',
    customer: customer.id,
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    billing_address_collection: 'required',
  });

  return res.status(200).json({
    success: true,
    url: session.url,
  });
};

/**
 * @description Update payment status
 * @access private
 * @route POST /api/v1/session/payment/webhook
 * @param { } req
 * @returns { success, message } res
 */

export const paymentUpdate = async (req: Request, res: Response) => {
  let data: any;
  let eventType;

  let endpointSecret: string;
  endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (endpointSecret) {
    const sig = req.headers['stripe-signature'] as string | string[] | Buffer;
    let event;

    const rawBody = req.rawBody as Buffer;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer: any) => {
        try {
          // Update payment stajtus
          const userId = customer.metadata.userId;
          const orderId = data.client_reference_id;

          // Find using orderId and update
          await Order.findOneAndUpdate(
            { _id: orderId, customerId: userId },
            {
              orderStatus: 'DISPATCHED',
              paymentStatus: data.payment_status,
              paymentMethod: data.payment_method_types[0],
              shippingDetails: data.shipping_details,
            },
            { new: true }
          );
        } catch (error) {
          console.log('>>err', error);
        }
      })
      .catch((err) => console.log(err));

    res.sendStatus(200).end();
  }
};
