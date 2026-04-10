import Category from "../models/Category.js";
import slugify from "slugify";
import ErrorResponse from "../utils/errorResponse.js";
import { check } from "express-validator";

export const categoryValidation = [
  check("name", "Category name is required").notEmpty().trim(),
];


export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
    });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};


export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug, isActive: true },
    });

    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, isActive } = req.body;
    
    const slug = slugify(name, { lower: true });
    
    let image = "";
    if (req.file) {
        image = req.file.path;
    }

    const category = await Category.create({
        name,
        slug,
        description,
        image,
        isActive
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findByPk(req.params.id);

    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }

    const { name, description, isActive } = req.body;

    if (name) {
      req.body.slug = slugify(name, { lower: true });
    }
    
    if (req.file) {
        req.body.image = req.file.path;
    }

    category = await category.update(req.body);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }

    await category.destroy();
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
