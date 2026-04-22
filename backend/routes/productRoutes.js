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
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN"), upload.array("images", 5), validate(productValidation), createProduct);
router.put("/:id", protect, authorize("ADMIN"), upload.array("images", 5), updateProduct);
router.delete("/:id", protect, authorize("ADMIN"), deleteProduct);

export default router;
