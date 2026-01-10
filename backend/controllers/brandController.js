import Brand from "../models/Brand.js";

// @desc    Create a new brand
// @route   POST /api/brands
// @access  Admin
export const createBrand = async (req, res) => {
  try {
    const { name, description, logoUrl } = req.body;

    // Check if brand already exists
    const existing = await Brand.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Brand already exists.' });
    }

    const brand = new Brand({ name, description, logoUrl });
    await brand.save();

    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating brand.', error: error.message });
  }
};

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching brands.', error: error.message });
  }
};

// @desc    Get brand details by ID
// @route   GET /api/brands/:id
// @access  Public
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching brand.', error: error.message });
  }
};

// @desc    Update brand by ID
// @route   PUT /api/brands/:id
// @access  Admin
export const updateBrand = async (req, res) => {
  try {
    const { name, description, logoUrl } = req.body;
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }

    if (name) brand.name = name;
    if (description) brand.description = description;
    if (logoUrl) brand.logoUrl = logoUrl;

    await brand.save();

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating brand.', error: error.message });
  }
};

// @desc    Delete brand by ID
// @route   DELETE /api/brands/:id
// @access  Admin
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }

    await brand.remove();

    res.json({ message: 'Brand deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting brand.', error: error.message });
  }
};
