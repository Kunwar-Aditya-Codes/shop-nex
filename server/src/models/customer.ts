import mongoose, { Schema } from 'mongoose';

export interface CustomerAttributes extends Schema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  isAdmin: boolean;
  isVerified: boolean;
}

const customerSchema = new mongoose.Schema<CustomerAttributes>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
