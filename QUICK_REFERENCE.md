# FRONTLINE Backend - Quick Reference Card

## 🚀 Server Status
- **Status**: ✅ Running on port 5001
- **Mode**: Development (auto-reload enabled)
- **Health**: http://localhost:5001/api/health

## 📁 Key Files
- `server.js` - Main application
- `.env` - Configuration
- `routes/` - API endpoints
- `middleware/` - Auth & validation
- `services/` - Email service

## 🔐 Test Accounts
```
Admin:
  Email: admin@frontline.com
  Password: admin123

Demo User (create one):
  Email: testuser@example.com
  Password: TestPassword123
```

## ⚡ Essential Commands
```bash
npm run dev        # Start with auto-reload
npm start          # Production start
npm install        # Install dependencies
chmod +x test-api.sh && ./test-api.sh  # Run tests
```

## 📝 Environment Variables to Update
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=strong-random-string
```

## 🔌 Main API Routes
```
/api/auth/          → Authentication (register, login, profile)
/api/products/      → Products & search
/api/contact/       → Contact forms
/api/payments/      → Stripe payments
/api/admin/         → Admin dashboard
```

## 💡 Example Requests

### Register User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Name","email":"user@example.com","password":"Pass123"}'
```

### Search Products
```bash
curl http://localhost:5001/api/products/search/dewalt
```

### Use Token (replace TOKEN)
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5001/api/auth/profile
```

### Submit Contact
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Name","email":"email@example.com","message":"Hello"}'
```

## 📊 API Summary
- **27 total endpoints**
- **5** authentication endpoints
- **4** product endpoints
- **3** contact endpoints
- **4** payment endpoints
- **8** admin endpoints

## 🎯 Features Included
✅ JWT Authentication
✅ Email Notifications
✅ Stripe Payments
✅ Product Search
✅ Request Validation
✅ Admin Dashboard
✅ Order Management
✅ Contact System

## 📚 Documentation
- `BACKEND_GUIDE.md` - Complete setup guide
- `API_DOCUMENTATION.md` - Endpoint reference
- `COMPLETE_SETUP.md` - Full overview

## 🧪 Testing Tools
- Postman: https://www.postman.com
- Thunder Client: VS Code extension
- cURL: Built-in command line tool
- Script: `./test-api.sh`

## 🔒 Remember
- Change JWT_SECRET before production
- Setup email service (Gmail)
- Configure Stripe API keys
- Enable HTTPS in production
- Use environment variables for secrets

## 🎉 You're Ready!
Backend is fully functional. Integrate with frontend and deploy!
