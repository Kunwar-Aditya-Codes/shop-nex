import mongoose, { Schema } from 'mongoose';

export interface SuccessAttributes extends Schema {
  token: string;
}

const successSchema = new mongoose.Schema<SuccessAttributes>(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Success = mongoose.model('Success', successSchema);

export default Success;
