import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../middleware/auth.js';
import { validateRequest, registerValidation, loginValidation } from '../middleware/validation.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../services/emailService.js';

const router = express.Router();

// In-memory user storage - Replace with database later
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@frontline.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    createdAt: new Date()
  }
];

// User registration
router.post('/register', validateRequest(registerValidation), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    // Generate token
    const token = generateToken(newUser.id, newUser.role);
    
    // Send welcome email
    await sendWelcomeEmail(email, name);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message
    });
  }
});

// User login
router.post('/login', validateRequest(loginValidation), (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Verify password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = generateToken(user.id, user.role);
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
});

// Get current user profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      message: error.message
    });
  }
});

// Request password reset
router.post('/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Email not found'
      });
    }
    
    // Generate reset token (in production, store in database with expiry)
    const resetToken = bcrypt.hashSync(email + Date.now(), 5);
    
    // Send reset email
    sendPasswordResetEmail(email, resetToken);
    
    res.json({
      success: true,
      message: 'Password reset email sent. Check your inbox.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process request',
      message: error.message
    });
  }
});

// Logout (optional - mainly for frontend to clear token)
router.post('/logout', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

export default router;
