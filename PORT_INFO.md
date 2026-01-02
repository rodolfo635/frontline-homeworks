# FRONTLINE Homeworks - Port Access Guide

## Your Server is Online! 🎉

Your website is currently running on **port 5000** via Python HTTP Server.

### Local Access
- **URL:** `http://localhost:5000`

### Making Port Public (GitHub Codespaces)

#### Step 1: Open Ports Panel
- Look at the bottom of VS Code (next to Terminal tab)
- Click on the **"Ports"** tab

#### Step 2: Make Port Public
- Find **port 5000** in the list
- Right-click on it
- Select **"Make Public"**

#### Step 3: Get Your Public URL
- A public URL will be generated automatically
- It will look like: `https://your-codespace-name-port-5000.preview.app.github.dev`
- Copy this URL and share it!

### Server Status
- ✅ Server Running: YES
- ✅ Port: 5000
- ✅ Location: /workspaces/frontline-homeworks
- ✅ Files Being Served: index.html, CSS, images, videos

### To Restart Server (if needed)
```bash
# Kill current server
pkill -f "python3 -m http.server 5000"

# Start new server
cd /workspaces/frontline-homeworks
python3 -m http.server 5000
```

### Share Your Site
Once the port is made public, you can share the generated URL with anyone to view your Frontline Homeworks website!
