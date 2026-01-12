import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Create new order
router.post('/', protect, createOrder);

// Get logged in user's orders
router.get('/myorders', protect, getMyOrders);

// Get specific order by ID (only owner or admin)
router.get('/:id', protect, getOrderById);

// Update order payment status (owner or admin)
router.put('/:id/pay', protect, updateOrderToPaid);

// Update order delivery status (admin only)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// Admin route to get all orders
router.get('/', protect, admin, getAllOrders);

export default router;