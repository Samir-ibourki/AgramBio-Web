import express from "express";
import { getPage, createPage, updatePage } from "../controllers/pageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:slug", getPage);
router.post("/", protect, createPage);
router.put("/:id", protect, updatePage);

export default router;
