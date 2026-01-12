import Stripe from 'stripe';
import Order from '../models/Order.js';
import "dotenv/config";

// Initialize Stripe with secret key from environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create Stripe Payment Intent
 * @route   POST /api/payments/stripe-intent
 * @access  Private
 */
export const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount for payment intent.' });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency,
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    res.status(500).json({ message: 'Stripe payment intent creation failed.', error: error.message });
  }
};

/**
 * @desc    Record PayPal payment confirmation for order
 * @route   POST /api/payments/paypal-confirm
 * @access  Private
 */
export const confirmPayPalPayment = async (req, res) => {
  try {
    const { orderId, paymentResult } = req.body;

    if (!orderId || !paymentResult) {
      return res.status(400).json({ message: 'Order ID and payment result are required.' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Authorization: only order owner or admin can mark payment completed
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update payment for this order.' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentResult; // Store PayPal payment details

    await order.save();

    res.json(order);
  } catch (error) {
    console.error('PayPal payment confirmation error:', error);
    res.status(500).json({ message: 'PayPal payment confirmation failed.', error: error.message });
  }
};
