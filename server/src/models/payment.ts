import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

const Payment = sequelize.define<Model>(
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
