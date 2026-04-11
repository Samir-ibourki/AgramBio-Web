import Category from "./Category.js";
import Product from "./Product.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Admin from "./Admin.js";
import Payment from "./Payment.js";
import Review from "./Review.js";
import BankInfo from "./BankInfo.js";

// Category has many products
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

// Order has many order items
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

// Product has many order items
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// Product has many reviews
Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});
Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// Order can have many payment attempts
Order.hasMany(Payment, {
  foreignKey: "orderId",
  as: "payments",
});
Payment.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

export { Admin, Category, Product, Order, OrderItem, Payment, Review, BankInfo };
