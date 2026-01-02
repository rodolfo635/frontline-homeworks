#!/bin/bash

# FRONTLINE Homeworks - API Testing Script
# Run these commands to test all endpoints

API_URL="http://localhost:5001/api"

echo "🧪 FRONTLINE Homeworks API Testing"
echo "=================================="
echo ""

# 1. Health Check
echo "1️⃣  Testing Health Check..."
curl -s "$API_URL/health" | jq '.'
echo ""
echo ""

# 2. Get All Products
echo "2️⃣  Testing Get All Products..."
curl -s "$API_URL/products" | jq '.'
echo ""
echo ""

# 3. Search Products
echo "3️⃣  Testing Search (query: 'dewalt')..."
curl -s "$API_URL/products/search/dewalt" | jq '.'
echo ""
echo ""

# 4. Get Product by Category
echo "4️⃣  Testing Get Products by Category..."
curl -s "$API_URL/products/category/power-tools" | jq '.'
echo ""
echo ""

# 5. User Registration
echo "5️⃣  Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }')
echo "$REGISTER_RESPONSE" | jq '.'
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')
echo "📝 Token saved: $TOKEN"
echo ""
echo ""

# 6. Get User Profile
echo "6️⃣  Testing Get User Profile (requires token)..."
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/auth/profile" | jq '.'
echo ""
echo ""

# 7. Submit Contact Form
echo "7️⃣  Testing Submit Contact Form..."
curl -s -X POST "$API_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "555-1234",
    "message": "I am interested in your power tools"
  }' | jq '.'
echo ""
echo ""

# 8. Create Payment Intent
echo "8️⃣  Testing Create Payment Intent (requires token)..."
curl -s -X POST "$API_URL/payments/create-intent" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.99,
    "productId": 1,
    "productName": "DEWALT Power Tools"
  }' | jq '.'
echo ""
echo ""

# 9. Get User Orders
echo "9️⃣  Testing Get User Orders (requires token)..."
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/payments/orders" | jq '.'
echo ""
echo ""

# 10. Admin Dashboard (requires admin token)
echo "🔟 Testing Admin Dashboard (with admin token)..."
echo "First, login as admin..."
ADMIN_LOGIN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@frontline.com",
    "password": "admin123"
  }')
ADMIN_TOKEN=$(echo "$ADMIN_LOGIN" | jq -r '.token')
echo "Admin token obtained."
echo ""

curl -s -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/dashboard" | jq '.'
echo ""
echo ""

echo "✅ All tests completed!"
echo "=================================="
echo ""
echo "💡 Tips:"
echo "- Save tokens in variables for reuse"
echo "- Test with Postman or Thunder Client for better UX"
echo "- Check .env file for configuration"
echo "- Review BACKEND_GUIDE.md for complete documentation"
