import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Review from "../models/Review.js";
import slugify from "slugify";
import ErrorResponse from "../utils/errorResponse.js";
import { check } from "express-validator";
import { Op } from "sequelize";

export const productValidation = [
  check("name", "Product name is required").notEmpty(),
  check("price", "Valid price is required").isNumeric(),
  check("categoryId", "Category ID is required").isUUID(),
];

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    const queryOptions = {
      where: { isActive: true },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
      ],
    };

    if (category) {
      const categoryData = await Category.findOne({ where: { slug: category } });
      if (categoryData) {
        queryOptions.where.categoryId = categoryData.id;
      }
    }

    if (search) {
      queryOptions.where[Op.or] = [
        { "name.fr": { [Op.iLike]: `%${search}%` } },
        { "name.ar": { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (minPrice || maxPrice) {
      queryOptions.where.price = {};
      if (minPrice) queryOptions.where.price[Op.gte] = minPrice;
      if (maxPrice) queryOptions.where.price[Op.lte] = maxPrice;
    }

    if (sort) {
      const parts = sort.split(":");
      queryOptions.order = [[parts[0], parts[1] || "ASC"]];
    } else {
      queryOptions.order = [["createdAt", "DESC"]];
    }

    const products = await Product.findAll(queryOptions);
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: Review,
          as: "reviews",
          where: { isApproved: true },
          required: false,
        },
      ],
    });

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    req.body.slug = slugify(name.fr || name.ar, { lower: true });

    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    if (req.body.name) {
      req.body.slug = slugify(req.body.name.fr || req.body.name.ar, { lower: true });
    }

    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }

    product = await product.update(req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    await product.destroy();
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { isFeatured: true, isActive: true },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
      ],
      limit: 8,
    });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};
