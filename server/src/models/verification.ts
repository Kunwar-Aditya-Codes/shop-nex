import mongoose, { Schema } from 'mongoose';

export interface VerificationAttributes extends Schema {
  email: string;
  otp: string;
  expiresAt: Date;
}

const verificationSchema = new mongoose.Schema<VerificationAttributes>(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      allowNull: false,
      defaultValue: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
