import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
} from '../controllers/productController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/filter', filterProducts);
router.get('/:id', getProductById);

// Protected routes for admin only
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;