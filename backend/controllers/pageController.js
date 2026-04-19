import Page from "../models/Page.js";
import ErrorResponse from "../utils/errorResponse.js";
import slugify from "slugify";

export const getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug, isActive: true },
    });

    if (!page) {
      return next(new ErrorResponse("Page not found", 404));
    }

    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req, res, next) => {
  try {
    const { title } = req.body;
    req.body.slug = slugify(title.fr || title.ar, { lower: true });

    const page = await Page.create(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    let page = await Page.findByPk(req.params.id);

    if (!page) {
      return next(new ErrorResponse("Page not found", 404));
    }

    if (req.body.title) {
        req.body.slug = slugify(req.body.title.fr || req.body.title.ar, { lower: true });
    }

    page = await page.update(req.body);
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};
