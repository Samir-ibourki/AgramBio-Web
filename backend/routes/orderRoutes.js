import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  orderValidation,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { verifyTurnstile } from "../middleware/turnstileMiddleware.js";

const router = express.Router();

router.post("/", verifyTurnstile, validate(orderValidation), createOrder);

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, authorize("ADMIN"), updateOrderStatus);

export default router;
