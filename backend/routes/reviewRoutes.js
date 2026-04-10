import express from "express";
import {
  getProductReviews,
  createReview,
  getReviews,
  approveReview,
  deleteReview,
  reviewValidation,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);
router.post("/", validate(reviewValidation), createReview);

// protected routes (admin only)
router.get("/", protect, getReviews);
router.put("/:id/approve", protect, approveReview);
router.delete("/:id", protect, deleteReview);

export default router;
