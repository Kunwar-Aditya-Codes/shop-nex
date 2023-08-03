import mongoose, { Schema } from 'mongoose';

export interface OrderAttributes extends Schema {
  orderDate: Date;
  orderStatus: string;
  customerId: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  deliveryDate: Date;
  shippingDetails: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    name: string;
  };
  orderItems: [];
  // orderItems: mongoose.Schema.Types.ObjectId[];
  paymentMethod: string;
  paymentStatus: string;
}

const orderSchema = new mongoose.Schema<OrderAttributes>(
  {
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    orderItems: [
      {
        productId: {
          // type: mongoose.Schema.Types.ObjectId,
          // ref: 'Product',
          // required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    orderStatus: {
      type: String,
      enum: ['PENDING', 'DELIVERED', 'DISPATCHED', 'CANCELLED'],
      default: 'PENDING',
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
    },

    paymentStatus: {
      type: String,
      default: 'PENDING',
      required: true,
    },

    shippingDetails: {
      address: {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String,
      },
      name: String,
    },

    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
