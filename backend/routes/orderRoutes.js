import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  orderValidation,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", validate(orderValidation), createOrder);

// protected routes (admin only)
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);

export default router;
