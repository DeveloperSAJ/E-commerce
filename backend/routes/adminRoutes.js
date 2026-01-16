import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  deleteUser,
  getProductStats,
  getOrderStats,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';
import { getAnalytics } from "../controllers/adminAnalyticsController.js";
const router = express.Router();

// Protect all routes and restrict to admin
router.use(protect);
router.use(admin);

// Product CRUD
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Analytics routes
// router.get('/analytics', getAnalytics);
router.get('/product-stats', getProductStats);
router.get('/order-stats', getOrderStats);

// Manage users
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);


router.get("/analytics", protect, admin, getAnalytics);

export default router;