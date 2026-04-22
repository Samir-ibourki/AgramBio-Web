import Category from "./Category.js";
import Product from "./Product.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import User from "./User.js";
import Payment from "./Payment.js";
import Review from "./Review.js";
import BankInfo from "./BankInfo.js";
import Page from "./Page.js";

User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});
Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Order.hasMany(Payment, {
  foreignKey: "orderId",
  as: "payments",
});
Payment.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

export { User, Category, Product, Order, OrderItem, Payment, Review, BankInfo, Page };
