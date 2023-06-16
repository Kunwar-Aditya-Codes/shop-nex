import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

const OrderList = sequelize.define<Model>(
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
