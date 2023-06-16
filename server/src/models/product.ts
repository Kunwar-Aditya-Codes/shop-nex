import { sequelize } from '../config/connection';
import { DataTypes, Model } from 'sequelize';

const Product = sequelize.define<Model>(
  'Product',
  {
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    productImage: {
      type: DataTypes.STRING,
    },

    productCategory: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },

    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    variants: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
