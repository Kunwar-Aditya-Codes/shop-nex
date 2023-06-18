import { sequelize } from '../config/connection';
import { DataTypes, Model } from 'sequelize';

export interface ProductAttributes extends Model {
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  productImage: string;
  category: string[];
  stock: number;
  variants: string[];
}

const Product = sequelize.define<ProductAttributes>(
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

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    productImage: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },

    stock: {
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
