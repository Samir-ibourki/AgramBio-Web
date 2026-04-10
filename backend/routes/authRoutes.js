import express from "express";
import {
  login,
  getMe,
  forgotPassword,
  resetPassword,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../controllers/AuthControllers.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/login", validate(loginValidation), login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", validate(forgotPasswordValidation), forgotPassword);
router.put("/resetpassword/:resettoken", validate(resetPasswordValidation), resetPassword);

export default router;
