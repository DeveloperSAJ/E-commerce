import express from 'express';
import { 
  getCart,
  addOrUpdateCartItem, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from '../controllers/cartController.js';
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user's cart
router.get('/', getCart);

// Add or update a cart item (upsert)
router.post('/', addOrUpdateCartItem);

// Update quantity of a specific item
router.put('/:productId', updateCartItem);

// Remove a specific item
router.delete('/:productId', removeCartItem);

// Clear entire cart
router.delete('/', clearCart);

export default router;