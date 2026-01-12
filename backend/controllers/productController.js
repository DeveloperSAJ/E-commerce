import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

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
    category,
    price,
    countInStock,
    imageUrls,
  } = req.body;

  // Basic validation
  if (!name || !brand || !price) {
    res.status(400);
    throw new Error('Please provide required fields: name, brand, price');
  }

  const product = new Product({
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    imageUrls,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc    Get all products with search & filters
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const brandFilter = req.query.brand ? { brand: req.query.brand } : {};
  const categoryFilter = req.query.category ? { category: req.query.category } : {};

  // Price filter example: price[lte]=1000, price[gte]=500
  const priceFilter = {};
  if (req.query['price[gte]']) priceFilter.$gte = Number(req.query['price[gte]']);
  if (req.query['price[lte]']) priceFilter.$lte = Number(req.query['price[lte]']);
  const priceCondition = Object.keys(priceFilter).length ? { price: priceFilter } : {};

  const count = await Product.countDocuments({
    ...keyword,
    ...brandFilter,
    ...categoryFilter,
    ...priceCondition,
  });

  const products = await Product.find({
    ...keyword,
    ...brandFilter,
    ...categoryFilter,
    ...priceCondition,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    imageUrls,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price ?? product.price; // price might be 0
    product.countInStock = countInStock ?? product.countInStock;
    product.imageUrls = imageUrls || product.imageUrls;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


// @desc    Search products by keyword (name, description)
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ message: 'Search keyword is required' });
    }

    // Case-insensitive regex search on name and description
    const regex = new RegExp(keyword, 'i');

    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
    }).populate('brand', 'name');

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Filter products by multiple criteria
// @route   GET /api/products/filter
// @access  Public
export const filterProducts = async (req, res, next) => {
  try {
    const { brand, minPrice, maxPrice, category, minRating } = req.query;

    // Build filter object dynamically
    let filter = {};

    if (brand) {
      // Accept brand as brand id or name, assuming ID for clarity
      filter.brand = brand;
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    const products = await Product.find(filter).populate('brand', 'name');

    res.json(products);
  } catch (error) {
    next(error);
  }
};


