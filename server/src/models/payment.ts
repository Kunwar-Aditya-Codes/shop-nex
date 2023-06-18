import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

interface PaymentAttributes extends Model {
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  userId: string;
  paymentDate: Date;
}

const Payment = sequelize.define<PaymentAttributes>(
  'Payment',
  {
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    paymentMethod: {
      type: DataTypes.ENUM('CARD', 'UPI'),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM('SUCCESS', 'FAILED', 'PENDING'),
      defaultValue: 'PENDING',
      allowNull: false,
    },

    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'userId',
      },
    },

    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: 'payments',
    timestamps: true,
  }
);

export default Payment;
