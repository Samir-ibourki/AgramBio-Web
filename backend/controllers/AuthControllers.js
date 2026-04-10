import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { check } from "express-validator";
import Admin from "../models/Admin.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

export const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

export const forgotPasswordValidation = [
  check("email", "Please include a valid email").isEmail(),
];

export const resetPasswordValidation = [
  check("password", "Password is required").isLength({ min: 6 }),
];

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ["password", "resetPasswordToken", "resetPasswordExpire"] },
    });

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });

    if (!admin) {
      return next(new ErrorResponse("There is no admin with that email", 404));
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await admin.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: admin.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      console.error(err);
      admin.resetPasswordToken = null;
      admin.resetPasswordExpire = null;
      await admin.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const admin = await Admin.findOne({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!admin) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    const salt = await bcrypt.genSalt(12);
    admin.password = await bcrypt.hash(req.body.password, salt);
    
    admin.resetPasswordToken = null;
    admin.resetPasswordExpire = null;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};