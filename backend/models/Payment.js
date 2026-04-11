import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "CMI",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    rawResponse: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "payments",
    timestamps: true,
    updatedAt: false
  }
);

export default Payment;
