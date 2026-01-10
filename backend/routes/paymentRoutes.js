import express from 'express';
import {
  createStripeCheckoutSession,
  createPayPalOrder,
  capturePayPalOrder,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/stripe-session', protect, createStripeCheckoutSession);
router.post('/paypal-order', protect, createPayPalOrder);
router.post('/paypal-capture', protect, capturePayPalOrder);

export default router;