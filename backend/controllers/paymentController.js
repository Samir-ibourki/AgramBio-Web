import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import ErrorResponse from "../utils/errorResponse.js";
import { check } from "express-validator";


export const paymentValidation = [
  check("orderId", "Order ID is required").isUUID(),
  check("paymentMethod", "Payment method is required").notEmpty(),
  check("amount", "Amount is required").isNumeric(),
  check("transactionId", "Transaction ID is required").notEmpty(),
];


export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Order, as: "order", attributes: ["customerName", "totalPrice"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, count: payments.length, data: payments });
  } catch (error) {
    next(error);
  }
};


export const getPaymentByOrder = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      where: { orderId: req.params.orderId },
      include: [{ model: Order, as: "order" }],
    });

    if (!payment) {
      return next(new ErrorResponse("Payment record not found for this order", 404));
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};


export const recordPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, amount, transactionId, status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    const payment = await Payment.create({
      orderId,
      paymentMethod,
      amount,
      transactionId,
      status: status || "completed",
    });

    if (payment.status === "completed") {
      order.paymentStatus = "paid";
      await order.save();
    }

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};
