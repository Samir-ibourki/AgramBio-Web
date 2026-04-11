import express from "express";
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productValidation,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:slug", getProduct);

// Protected routes (Admin only)
router.post("/", protect, upload.array("images", 5), validate(productValidation), createProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
