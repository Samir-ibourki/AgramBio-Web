import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Payment from "../models/Payment.js";
import ErrorResponse from "../utils/errorResponse.js";
import { check } from "express-validator";
import sequelize from "../config/database.js";
import paymentService from "../utils/paymentService.js";

export const orderValidation = [
  check("customerName", "Name is required").notEmpty().trim(),
  check("email", "Valid email is required").isEmail(),
  check("phone", "Phone number is required").notEmpty(),
  check("address", "Address is required").notEmpty(),
  check("city", "City is required").notEmpty(),
  check("orderItems", "Order items are required").isArray({ min: 1 }),
  check("paymentMethod", "Payment method is required").isIn(["COD", "VIREMENT"]),
];

export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const {
      orderItems,
      customerName,
      email,
      phone,
      address,
      city,
      notes,
      paymentMethod = "COD",
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return next(new ErrorResponse("No order items", 400));
    }

    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      city,
      notes,
      totalPrice: 0, 
    }, { transaction: t });

    let calculatedProductTotal = 0;
    let hasFreeShippingProduct = false;

    for (const item of orderItems) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new ErrorResponse(`Product not found: ${item.productId}`, 404);
      }

      if (product.isFreeShipping) {
        hasFreeShippingProduct = true;
      }

      const price = product.price;
      const subtotal = price * item.quantity;
      calculatedProductTotal += subtotal;

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      }, { transaction: t });
    }

    const shippingFee = (calculatedProductTotal >= 500 || hasFreeShippingProduct) ? 0 : 35;
    const finalTotalPrice = calculatedProductTotal + shippingFee;

    await order.update({ totalPrice: finalTotalPrice, shippingPrice: shippingFee }, { transaction: t });

    let paymentResponseData = {};
    let status = "PENDING";
    let referenceNumber = null;

    if (paymentMethod === "VIREMENT") {
      status = "AWAITING_PAYMENT";
      paymentResponseData.bankAccounts = await paymentService.getActiveBankAccounts();
    }

    const payment = await Payment.create({
      orderId: order.id,
      amount: finalTotalPrice,
      paymentMethod: paymentMethod,
      status: status,
      referenceNumber: referenceNumber,
      provider: "NONE",
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      success: true,
      data: {
        ...order.toJSON(),
        payment: {
          id: payment.id,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          ...paymentResponseData
        }
      },
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product", attributes: ["name", "images"] }],
        },
      ],
    });

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    const { orderStatus } = req.body;
    order.orderStatus = orderStatus;

    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};
