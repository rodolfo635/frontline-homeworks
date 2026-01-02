import express from 'express';

const router = express.Router();

// Mock product data - Replace with database queries later
const products = [
  {
    id: 1,
    name: 'DEWALT Power Tools',
    category: 'power-tools',
    price: 129.99,
    description: 'Professional grade power tools',
    image: 'dewalt.jfif'
  },
  {
    id: 2,
    name: 'INGCO Tools',
    category: 'hand-tools',
    price: 49.99,
    description: 'Quality tools for every project',
    image: 'INGCO.jfif'
  },
  {
    id: 3,
    name: 'BOSCH Routers',
    category: 'power-tools',
    price: 199.99,
    description: 'Precision cutting and routing',
    image: 'ROUTER.jfif'
  },
  {
    id: 4,
    name: 'Cabinet Hardware',
    category: 'hardware',
    price: 29.99,
    description: 'Premium handles and fittings',
    image: 'Cabinet Hardware - Handle Shop Couture.jfif'
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// GET products by category
router.get('/category/:category', (req, res) => {
  const filtered = products.filter(p => p.category === req.params.category);
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// SEARCH products by name or description
router.get('/search/:query', (req, res) => {
  const searchTerm = req.params.query.toLowerCase();
  
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm)
  );
  
  res.json({
    success: true,
    count: filtered.length,
    query: searchTerm,
    data: filtered
  });
});

// POST - Add new product (requires authentication later)
router.post('/', (req, res) => {
  const { name, category, price, description, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      error: 'Name and price are required'
    });
  }
  
  const newProduct = {
    id: Math.max(...products.map(p => p.id), 0) + 1,
    name,
    category: category || 'uncategorized',
    price,
    description: description || '',
    image: image || ''
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    data: newProduct
  });
});

export default router;
