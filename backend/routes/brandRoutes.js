import express from 'express';
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brandController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getBrands);              // Public route to get all brands
router.get('/:id', getBrandById);        // Public route to get brand by ID

// Protected, admin-only routes
router.post('/', protect, admin, createBrand);
router.put('/:id', protect, admin, updateBrand);
router.delete('/:id', protect, admin, deleteBrand);

export default router;
