import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getAllUsers,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect these routes and allow access only for admin users
router.use(protect);
router.use(admin);

// CRUD for products
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Admin dashboard analytics
router.get('/analytics', getAnalytics);

// Manage users
router.get('/users', getAllUsers);

export default router;
