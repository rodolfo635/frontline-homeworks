import express from 'express';

const router = express.Router();

// In-memory storage for contacts - Replace with database later
const contacts = [];

// POST - Submit contact form
router.post('/', (req, res) => {
  const { name, email, message, phone } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required'
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }
  
  const contactData = {
    id: contacts.length + 1,
    name,
    email,
    phone: phone || '',
    message,
    timestamp: new Date().toISOString(),
    status: 'new'
  };
  
  contacts.push(contactData);
  
  // TODO: Send email notification
  console.log('New contact submission:', contactData);
  
  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us. We will get back to you soon.',
    data: { id: contactData.id }
  });
});

// GET all contacts (admin only - add authentication later)
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});

// GET contact by ID
router.get('/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  
  if (!contact) {
    return res.status(404).json({
      success: false,
      error: 'Contact not found'
    });
  }
  
  res.json({
    success: true,
    data: contact
  });
});

export default router;
