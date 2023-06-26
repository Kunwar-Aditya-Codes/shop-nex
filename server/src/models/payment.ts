import mongoose, { Schema } from 'mongoose';

export interface PaymentAttributes extends Schema {
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  customerId: mongoose.Schema.Types.ObjectId;
  paymentDate: Date;
}

const paymentSchema = new mongoose.Schema<PaymentAttributes>(
  {
    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
