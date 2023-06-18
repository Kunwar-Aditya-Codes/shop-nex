import Order, { OrderAttributes } from '../models/order';
import Product, { ProductAttributes } from '../models/product';

interface NewProductAttributes extends ProductAttributes {
  OrderList: {
    quantity: number;
  };
}

interface OrderToUpdate extends OrderAttributes {
  Products: NewProductAttributes[];
}

export const updateStock = async ({ orderId }: { orderId: string }) => {
  const order = (await Order.findOne({
    where: { orderId },
    include: [
      {
        model: Product,
        attributes: ['productId', 'productName', 'stock'],
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  })) as OrderToUpdate;

  if (order) {
    const products = order.Products;
    products.forEach(async (product) => {
      const newStock = product.stock - product.OrderList.quantity;
      if (newStock >= 0) {
        product.stock = newStock;
        await product.save();
      }
    });
    return true;
  }
  return false;
};
