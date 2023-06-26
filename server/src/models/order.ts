import mongoose, { Schema } from 'mongoose';

export interface OrderAttributes extends Schema {
  orderDate: Date;
  orderStatus: string;
  customerId: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  shippingAddress: string;
  deliveryDate: Date;
  orderItems: mongoose.Schema.Types.ObjectId[];
  // paymentId: mongoose.Schema.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<OrderAttributes>(
  {
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    orderItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
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

    shippingAddress: {
      type: String,
      required: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    // paymentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Payment',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
