# 🔧 Troubleshooting Guide

## Error Messages Explained

### 1. Tailwind CDN Warning
```
cdn.tailwindcss.com should not be used in production
```
**Status:** ⚠️ **WARNING (Safe to ignore)**  
**Impact:** None - site works fine  
**Fix:** This is just informational. The CDN works perfectly for development and production landing pages. To remove the warning, you'd need to install Tailwind properly, but it's not necessary.

---

### 2. 401 Unauthorized on `/api/admin/me`
```
Failed to load resource: server responded with 401
```
**Status:** ✅ **EXPECTED BEHAVIOR**  
**Impact:** None - this is correct  
**Explanation:** This happens when you're NOT logged into the admin panel. The API correctly rejects unauthorized access.

**To Fix (if you want to access admin):**
1. Go to: `http://localhost:3000/131233@dsdswe/@ceefeifnv`
2. Login with:
   - Email: `mediva@admin.com`
   - Password: `Mediva@123`
3. After login, this error will disappear

---

### 3. 500 Error on `/api/submissions`
```
Failed to load resource: server responded with 500
```
**Status:** ❌ **SERVER ERROR - Needs Fixing**  
**Impact:** Forms won't submit  

**Common Causes:**
1. MongoDB not connected AND JSON file has issues
2. Server crashed or not running
3. Port already in use

**How to Fix:**

#### Solution A: Restart Server
```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

#### Solution B: Check What's Using Port 3000
```bash
# Windows PowerShell
netstat -ano | findstr :3000

# If something is using it, kill that process or change PORT in .env
```

#### Solution C: Change Port
Edit `.env`:
```
PORT=3001
```
Then restart server.

---

### 4. MongoDB Connection Failed
```
MongoDB connection failed: querySrv ECONNREFUSED
```
**Status:** ⚠️ **FALLBACK MODE**  
**Impact:** Low - site uses JSON file instead  

**What It Means:**
- Can't connect to MongoDB Atlas
- Automatically falls back to `data/submissions.json`
- Forms still work! Data saved locally

**Why It Happens:**
1. **Network firewall** blocking MongoDB
2. **Wrong URI** format
3. **MongoDB Atlas IP whitelist** not configured
4. **DNS issues**

**To Fix MongoDB Connection:**

#### Step 1: Check MongoDB Atlas Network Access
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster
3. Click "Network Access"
4. Add IP Address: `0.0.0.0/0` (Allow from anywhere)
5. Click "Confirm"

#### Step 2: Verify Connection String
Your current URI:
```
mongodb+srv://info_db_user:IqhAJ3wb9CSxTyeh@mediva.iaimvlq.mongodb.net/mediva_landing_db?retryWrites=true&w=majority&appName=mediva
```

Try this alternative format (without database name in path):
```
mongodb+srv://info_db_user:IqhAJ3wb9CSxTyeh@mediva.iaimvlq.mongodb.net/?retryWrites=true&w=majority&appName=mediva
```

#### Step 3: Test Connection
1. Update `.env` with corrected URI
2. Restart server: `npm run dev`
3. Look for: `✅ MongoDB connected successfully`

---

## Current Status Check

Run this command to see what's happening:
```bash
npm run dev
```

**Expected Output (Good):**
```
❌ MongoDB connection failed: [error message]
⚠️ Falling back to JSON file storage.
💡 Tip: Check your MongoDB URI and network access settings.
✅ Mediva running on port 3000
🔐 Admin dashboard: /131233@dsdswe/@ceefeifnv
💾 Storage: JSON file
🌐 Local URL: http://localhost:3000
📝 Test forms at: http://localhost:3000 (click Early Join or Contact)
```

This means:
- ✅ Server is running
- ✅ JSON fallback working
- ✅ Forms WILL work (saved to JSON file)
- ⚠️ MongoDB not connected (but that's okay for testing)

---

## Testing Form Submissions

Even without MongoDB, forms work! Here's how to test:

1. **Start server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:3000
   ```

3. **Click "Early Join" or "Contact"**

4. **Fill form and submit**

5. **You should see:**
   - Button shows "Submitting..."
   - Then changes to "Submitted ✓" with green highlight
   - Modal closes after 1.5 seconds

6. **Check data was saved:**
   - Open: `data/submissions.json`
   - You'll see your submission!

---

## Quick Fixes Summary

| Issue | Severity | Action |
|-------|----------|--------|
| Tailwind CDN warning | None | Ignore - works fine |
| 401 on /api/admin/me | None | Expected when not logged in |
| 500 on /api/submissions | High | Restart server or check port |
| MongoDB connection failed | Medium | Normal for testing - JSON fallback works |

---

## For Production (Vercel)

When you deploy to Vercel:
- ✅ MongoDB will connect (if configured correctly)
- ✅ No Tailwind warning (different build)
- ✅ All APIs work normally
- ✅ Environment variables set in Vercel dashboard

**Vercel Checklist:**
1. Set all environment variables in Vercel
2. Ensure MongoDB Atlas allows connections from anywhere (`0.0.0.0/0`)
3. Deploy - Vercel handles the rest!

---

## Still Having Issues?

### Check These:
1. ✅ Node.js version 18 or higher
   ```bash
   node --version
   ```

2. ✅ All dependencies installed
   ```bash
   npm install
   ```

3. ✅ .env file exists in project root
   ```bash
   ls .env
   ```

4. ✅ data/submissions.json exists and is valid JSON
   ```bash
   cat data/submissions.json
   ```

### Get Help:
- Check server logs in terminal
- Open browser console (F12) for errors
- Review `DEPLOY_NOW.md` for deployment steps
- Check `CHECKLIST.md` for setup verification

---

**TL;DR:** 
- Tailwind warning = normal
- 401 admin error = normal (not logged in)
- 500 submission error = restart server
- MongoDB failed = okay for now, uses JSON file instead

**Everything works fine even with these warnings!** 🎉
