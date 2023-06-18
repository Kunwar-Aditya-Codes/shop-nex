import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

interface OrderListAttributes extends Model {
  orderListId: string;
  quantity: number;
  orderId: string;
  productId: string;
}

const OrderList = sequelize.define<OrderListAttributes>(
  'OrderList',
  {
    orderListId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'orderlists',
    timestamps: true,
  }
);

export default OrderList;
