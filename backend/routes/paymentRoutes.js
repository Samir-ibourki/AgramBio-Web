import express from "express";
import {
  getPayments,
  getPaymentByOrder,
  recordPayment,
  paymentValidation,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", validate(paymentValidation), recordPayment);

// protected routes (admin only)
router.get("/", protect, getPayments);
router.get("/order/:orderId", protect, getPaymentByOrder);

export default router;
