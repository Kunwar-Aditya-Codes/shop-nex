import mongoose, { Schema } from 'mongoose';

export interface ProductAttributes extends Schema {
  productName: string;
  productDescription: string;
  price: number;
  productImage: string;
  category: string;
}

const productSchema = new mongoose.Schema<ProductAttributes>(
  {
    productName: {
      type: String,
      required: true,
    },

    productDescription: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    productImage: {
      type: String,
    },

    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
