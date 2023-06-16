import Customer from '../models/customer';
import Order from '../models/order';
import Product from '../models/product';
import Payment from '../models/payment';


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
Order.hasMany(Product, {
  foreignKey: 'productId',
  sourceKey: 'productId',
});
Product.belongsTo(Order, {
  foreignKey: 'productId',
  targetKey: 'productId',
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
