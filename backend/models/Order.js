import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shippingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("VIREMENT", "CARD", "ONLINE"),
      allowNull: false,
      defaultValue: "CARD",
    },
    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "PAID", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    orderStatus: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    indexes: [
      { fields: ["customerPhone"] },
      { fields: ["orderStatus"] },
      { fields: ["createdAt"] }
    ]
  }
);

export default Order;
