import express from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../middleware/auth.js';
import { validateRequest, paymentValidation } from '../middleware/validation.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here');

// In-memory orders storage - Replace with database
const orders = [];

// Create payment intent
router.post('/create-intent', verifyToken, async (req, res) => {
  try {
    const { amount, productId, productName } = req.body;
    
    if (!amount || amount < 0.50) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be at least $0.50'
      });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        productId,
        productName,
        userId: req.user.userId
      }
    });
    
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create payment intent',
      message: error.message
    });
  }
});

// Confirm payment
router.post('/confirm', verifyToken, async (req, res) => {
  try {
    const { paymentIntentId, productId, productName, amount, customerEmail, customerName } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Create order
      const order = {
        id: orders.length + 1,
        orderId: `ORDER-${Date.now()}`,
        userId: req.user.userId,
        productId,
        productName,
        amount,
        status: 'completed',
        paymentIntentId,
        customerEmail,
        customerName,
        createdAt: new Date()
      };
      
      orders.push(order);
      
      // Send confirmation email
      await sendOrderConfirmationEmail(
        customerEmail,
        customerName,
        order.orderId,
        amount
      );
      
      res.json({
        success: true,
        message: 'Payment successful',
        order
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment not completed',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Payment confirmation failed',
      message: error.message
    });
  }
});

// Get user orders
router.get('/orders', verifyToken, (req, res) => {
  try {
    const userOrders = orders.filter(o => o.userId === req.user.userId);
    
    res.json({
      success: true,
      count: userOrders.length,
      data: userOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

// Get order by ID
router.get('/orders/:orderId', verifyToken, (req, res) => {
  try {
    const order = orders.find(
      o => o.orderId === req.params.orderId && o.userId === req.user.userId
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

// Webhook for Stripe events (optional)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!endpointSecret) {
    return res.status(400).json({
      success: false,
      error: 'Webhook secret not configured'
    });
  }
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Webhook error',
      message: error.message
    });
  }
});

export default router;
