import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import { validateRequest, productValidation } from '../middleware/validation.js';

const router = express.Router();

// In-memory data (will be connected to database)
const adminData = {
  users: [],
  orders: [],
  contacts: [],
  analytics: {
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
  }
};

// GET dashboard stats
router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        totalRevenue: adminData.analytics.totalRevenue,
        totalOrders: adminData.analytics.totalOrders,
        totalCustomers: adminData.analytics.totalCustomers,
        recentOrders: adminData.orders.slice(-5),
        recentContacts: adminData.contacts.slice(-5),
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          revenue: [1200, 1900, 3000, 2500, 2200, 3200],
          orders: [30, 50, 45, 60, 55, 70]
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard',
      message: error.message
    });
  }
});

// GET all users (admin)
router.get('/users', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      count: adminData.users.length,
      data: adminData.users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// GET all orders (admin)
router.get('/orders', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      count: adminData.orders.length,
      data: adminData.orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

// GET all contacts (admin)
router.get('/contacts', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      count: adminData.contacts.length,
      data: adminData.contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
      message: error.message
    });
  }
});

// UPDATE order status (admin)
router.put('/orders/:orderId', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    // Find and update order
    const order = adminData.orders.find(o => o.orderId === req.params.orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
    }
    
    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update order',
      message: error.message
    });
  }
});

// UPDATE contact status (admin)
router.put('/contacts/:contactId', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'responded', 'resolved'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    // Find and update contact
    const contact = adminData.contacts.find(c => c.id === parseInt(req.params.contactId));
    if (contact) {
      contact.status = status;
      contact.updatedAt = new Date();
    }
    
    res.json({
      success: true,
      message: 'Contact status updated',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update contact',
      message: error.message
    });
  }
});

// DELETE user (admin)
router.delete('/users/:userId', verifyToken, verifyAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const index = adminData.users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const deletedUser = adminData.users.splice(index, 1);
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
      message: error.message
    });
  }
});

// GET analytics (admin)
router.get('/analytics', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        overview: {
          totalRevenue: adminData.analytics.totalRevenue,
          totalOrders: adminData.analytics.totalOrders,
          totalCustomers: adminData.analytics.totalCustomers,
          conversionRate: 3.45
        },
        monthlyStats: [
          { month: 'January', revenue: 4000, orders: 24, customers: 8 },
          { month: 'February', revenue: 3000, orders: 18, customers: 6 },
          { month: 'March', revenue: 2000, orders: 12, customers: 4 },
          { month: 'April', revenue: 2780, orders: 15, customers: 5 }
        ],
        topProducts: [
          { name: 'DEWALT Power Tools', sales: 450, revenue: 58500 },
          { name: 'INGCO Tools', sales: 320, revenue: 15968 },
          { name: 'BOSCH Routers', sales: 210, revenue: 41979 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
      message: error.message
    });
  }
});

// GET system logs (admin)
router.get('/logs', verifyToken, verifyAdmin, (req, res) => {
  try {
    const logs = [
      { timestamp: new Date(), level: 'info', message: 'Order #ORDER-123 completed' },
      { timestamp: new Date(), level: 'info', message: 'New contact form submission' },
      { timestamp: new Date(), level: 'warning', message: 'Low stock alert for product ID 2' },
      { timestamp: new Date(), level: 'error', message: 'Payment gateway timeout' }
    ];
    
    res.json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch logs',
      message: error.message
    });
  }
});

export default router;
