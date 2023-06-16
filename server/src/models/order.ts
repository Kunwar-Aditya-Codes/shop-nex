import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

const Order = sequelize.define<Model>(
  'Order',
  {
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    orderStatus: {
      type: DataTypes.ENUM(
        'PENDING',
        'DISPATCHED',
        'SHIPPED',
        'OUT_FOR_DELIVERY',
        'DELIVERED'
      ),
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

    productId: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId',
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'paymentId',
      },
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
