import axios from "axios";
import ErrorResponse from "../utils/errorResponse.js";

export const verifyTurnstile = async (req, res, next) => {
  const token = req.body.turnstileToken;
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return next();
  }

  if (!token) {
    return next(new ErrorResponse("Turnstile token is required", 400));
  }

  try {
    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        secret: secretKey,
        response: token,
        remoteip: req.ip,
      }
    );

    if (response.data.success) {
      next();
    } else {
      return next(new ErrorResponse("Turnstile verification failed", 400));
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return next(new ErrorResponse("Turnstile verification error", 500));
  }
};
