import express from "express";
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../controllers/AuthControllers.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", validate(forgotPasswordValidation), forgotPassword);
router.put("/resetpassword/:resettoken", validate(resetPasswordValidation), resetPassword);

export default router;
