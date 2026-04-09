import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {},
    orderId: {},
    productId: {},
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
  },
);
