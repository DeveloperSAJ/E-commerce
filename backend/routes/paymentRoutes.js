import express from 'express';
import {
  createStripePaymentIntent,
  confirmPayPalPayment,
} from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Stripe Payment Intent creation route
router.post('/stripe-intent', protect, createStripePaymentIntent);

// PayPal payment confirmation route
router.post('/paypal-confirm', protect, confirmPayPalPayment);

export default router;