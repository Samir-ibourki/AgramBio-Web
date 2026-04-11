import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  categoryValidation,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategory);

router.post("/", protect, upload.single("image"), validate(categoryValidation), createCategory);
router.put("/:id", protect, upload.single("image"), updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
