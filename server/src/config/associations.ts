import Customer from '../models/customer';
import Order from '../models/order';
import Product from '../models/product';
import Payment from '../models/payment';
import OrderList from '../models/orderList';

/** @description Customer-Order Association */
Customer.hasMany(Order, {
  foreignKey: 'userId',
  sourceKey: 'userId',
});
Order.belongsTo(Customer, {
  foreignKey: 'userId',
  targetKey: 'userId',
});

/** @description Customer-Payment Association */
Customer.hasMany(Payment, {
  foreignKey: 'userId',
  sourceKey: 'userId',
});
Payment.belongsTo(Customer, {
  foreignKey: 'userId',
  targetKey: 'userId',
});

/** @description Product-Order Association */
Product.belongsToMany(Order, {
  through: OrderList,
});
Order.belongsToMany(Product, {
  through: OrderList,
});

/** @description Customer-Payment Association */
Customer.hasMany(Payment, {
  foreignKey: 'userId',
  sourceKey: 'userId',
});
Payment.belongsTo(Customer, {
  foreignKey: 'userId',
  targetKey: 'userId',
});

/** @description Order-Payment Association */
Order.hasOne(Payment, {
  foreignKey: 'paymentId',
  sourceKey: 'paymentId',
});
Payment.belongsTo(Order, {
  foreignKey: 'paymentId',
  targetKey: 'paymentId',
});
