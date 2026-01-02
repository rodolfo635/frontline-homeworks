# How to Get a Permanent .io Online Link

## Option 1: GitHub Pages (Recommended - FREE & Permanent) ⭐

This is the easiest way to make your site permanent and shareable!

### Steps:
1. **Push to GitHub** (you already have the repo)
2. Go to your repo settings → **Pages**
3. Select **main branch** as source
4. Your site will be at: `https://rodolfo635.github.io/frontline-homeworks`

---

## Option 2: Ngrok (Temporary - Requires Free Account)

### Steps:
1. Sign up at: https://dashboard.ngrok.com/signup
2. Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken
3. Run these commands:
```bash
cd /tmp
./ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
./ngrok http 5000
```
4. Copy the public URL from ngrok output (it will be: `https://xxxx-xxxx-xxxx.ngrok-free.app`)

---

## Option 3: Cloudflare Tunnel (Recommended - FREE & More Stable)

### Steps:
1. Install cloudflare-cli: `npm install -g wrangler`
2. Run: `wrangler tunnel run http://localhost:5000`
3. You'll get a public URL

---

## Current Status
✅ Your local server is running on port 5000
✅ GitHub Codespace URL: `https://cautious-system-x5p6747645gw3pvg9-5000.preview.app.github.dev`

## My Recommendation
Use **GitHub Pages** - it's free, permanent, and perfect for your project! 🚀
