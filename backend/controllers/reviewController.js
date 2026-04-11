import Review from "../models/Review.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/errorResponse.js";
import { check } from "express-validator";


export const reviewValidation = [
  check("customerName", "Name is required").notEmpty().trim(),
  check("rating", "Rating must be between 1 and 5").isInt({ min: 1, max: 5 }),
  check("comment", "Comment is required").notEmpty().trim(),
  check("productId", "Product ID is required").isUUID(),
];


export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId,
        isApproved: true,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};


export const createReview = async (req, res, next) => {
  try {
    const { productId, customerName, rating, comment } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    const review = await Review.create({
      productId,
      customerName,
      rating,
      comment,
      isApproved: false, 
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Review submitted and awaiting approval",
    });
  } catch (error) {
    next(error);
  }
};


export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: Product, as: "product", attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};


export const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return next(new ErrorResponse("Review not found", 404));
    }

    review.isApproved = req.body.isApproved;
    await review.save();

    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};


export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return next(new ErrorResponse("Review not found", 404));
    }

    await review.destroy();
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
