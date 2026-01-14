import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    price,
    stock,
    images,
    categories,
    discount,
  } = req.body;

  if (!name || !brand || price == null) {
    res.status(400);
    throw new Error("name, brand and price are required");
  }

  const product = await Product.create({
    name,
    description,
    brand,
    price,
    stock,
    images,
    categories,
    discount,
  });

  res.status(201).json(product);
});

/**
 * @desc    Get all products (search + filters)
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const brandFilter = req.query.brand ? { brand: req.query.brand } : {};
  const categoryFilter = req.query.category
    ? { categories: req.query.category }
    : {};

  const priceFilter = {};
  if (req.query["price[gte]"]) priceFilter.$gte = Number(req.query["price[gte]"]);
  if (req.query["price[lte]"]) priceFilter.$lte = Number(req.query["price[lte]"]);
  const priceCondition =
    Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};

  const filter = {
    ...keyword,
    ...brandFilter,
    ...categoryFilter,
    ...priceCondition,
  };

  const count = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate("brand", "name")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json(products); // ✅ frontend-friendly
});

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "brand",
    "name"
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});
