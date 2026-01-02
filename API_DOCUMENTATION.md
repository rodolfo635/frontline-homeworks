# FRONTLINE Homeworks Backend API

Your Node.js/Express backend is now live on **port 5001**!

## Getting Started

### Start the Server
```bash
npm run dev          # Development mode with auto-reload
npm start            # Production mode
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Check if the server is running
```bash
curl http://localhost:5001/api/health
```

### Products API

#### Get All Products
- **GET** `/api/products`
- Returns all available products

```bash
curl http://localhost:5001/api/products
```

Response:
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": 1,
      "name": "DEWALT Power Tools",
      "category": "power-tools",
      "price": 129.99,
      "description": "Professional grade power tools",
      "image": "dewalt.jfif"
    }
  ]
}
```

#### Get Product by ID
- **GET** `/api/products/:id`
- Get a specific product

```bash
curl http://localhost:5001/api/products/1
```

#### Get Products by Category
- **GET** `/api/products/category/:category`
- Filter products by category

```bash
curl http://localhost:5001/api/products/category/power-tools
```

#### Add New Product
- **POST** `/api/products`
- Add a new product to the catalog

```bash
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "category": "hardware",
    "price": 49.99,
    "description": "Product description",
    "image": "image.jpg"
  }'
```

### Contact API

#### Submit Contact Form
- **POST** `/api/contact`
- Submit a contact request

```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "message": "I am interested in your products"
  }'
```

#### Get All Contacts (Admin)
- **GET** `/api/contact`
- Retrieve all contact submissions (add authentication later)

```bash
curl http://localhost:5001/api/contact
```

#### Get Contact by ID
- **GET** `/api/contact/:id`

```bash
curl http://localhost:5001/api/contact/1
```

## Frontend Integration

Update your `index.html` to fetch products from the API:

```javascript
// Fetch products
fetch('http://localhost:5001/api/products')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Submit contact form
fetch('http://localhost:5001/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Customer Name',
    email: 'customer@example.com',
    message: 'Contact message'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

## Environment Variables

The `.env` file contains:
```
PORT=5001
NODE_ENV=development
API_URL=http://localhost:5001
```

## Project Structure

```
frontline-homeworks/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
├── routes/
│   ├── products.js        # Product endpoints
│   └── contact.js         # Contact endpoints
├── index.html             # Frontend
└── style.css              # Styles
```

## Next Steps

**Optional Enhancements:**
1. **Database Integration** - Connect MongoDB or PostgreSQL
2. **Authentication** - Add JWT for user login/registration
3. **Email Service** - Integrate Nodemailer to send emails
4. **Upload Service** - Handle image uploads
5. **Admin Panel** - Create backend dashboard
6. **Payment Gateway** - Stripe/PayPal integration
7. **Search** - Implement full-text search
8. **Validation** - Add request validation library

## Testing Endpoints

You can test the API endpoints using:
- **Postman** - GUI tool for API testing
- **curl** - Command line
- **Thunderclient** - VS Code extension
- **REST Client** - VS Code extension

---

Your backend is ready! Start integrating these APIs into your frontend.
