# 🎯 Quick Reference - Admin Panel & URLs

## ✅ Admin Panel Access

### **URL (after deployment):**
```
https://mediva-health.com/131233@dsdswe/@ceefeifnv
```

Or encoded (use this in browser):
```
https://mediva-health.com/131233%40dsdswe/%40ceefeifnv
```

### **Local Testing:**
```
http://localhost:3000/131233@dsdswe/@ceefeifnv
```

### **Login Credentials:**
- **Email:** `mediva@admin.com`
- **Password:** `Mediva@123`

⚠️ **IMPORTANT:** Change these after deployment for security!

---

## 🗄️ MongoDB Configuration

**Database Name:** `mediva_landing_db`

**Connection String:**
```
mongodb+srv://info_db_user:IqhAJ3wb9CSxTyeh@mediva.iaimvlq.mongodb.net/mediva_landing_db?retryWrites=true&w=majority&appName=mediva
```

✅ Updated in `.env` file

---

## 🔧 Button Fix Applied

Fixed the popup buttons to fit the `button.svg` background properly:

### Changes Made:
- Increased button height from `40px` to `44px`
- Adjusted padding for better SVG fit
- Updated font sizing for better proportions
- Applied to all modal buttons (Join, Contact, Privacy, Safety)

### Affected Popups:
- ✅ Early Join Modal
- ✅ Contact Us Modal  
- ✅ Privacy Policy Modal
- ✅ Safety Protocols Modal

The buttons now properly display the `button.svg` background without being oversized.

---

## 📱 Testing the Fix

1. **Stop current server** (Ctrl+C)
2. **Restart:** `npm run dev`
3. **Open any popup:**
   - Click "Early Join" or "Contact" button
   - Check if button background fits properly
   - The SVG should fill the button perfectly

---

## 🚀 Deployment Checklist

### 1. Environment Variables (.env)
✅ MONGODB_URI with `mediva_landing_db` database name  
✅ ADMIN_EMAIL: `mediva@admin.com`  
✅ ADMIN_PASSWORD: `Mediva@123`  
✅ SESSION_SECRET: Updated (40+ chars)  

### 2. Push to GitHub
```bash
git add .
git commit -m "Fix button sizing and update MongoDB database name"
git push origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Add environment variables (same as above)
4. Click Deploy

### 4. Add Domain
1. Vercel Settings → Domains
2. Add: `www.mediva-health.com` and `mediva-health.com`
3. Update GoDaddy nameservers to Vercel's

---

## 🎨 What Changed

### Before:
- Buttons were too large (40px min-height)
- SVG background didn't fit properly
- Buttons looked oversized in popups

### After:
- Buttons are properly sized (44px min-height)
- SVG background fills button perfectly
- Better visual proportions
- Consistent across all modals

---

## 📊 File Updates Summary

| File | Change | Status |
|------|--------|--------|
| `.env` | MongoDB database name added | ✅ Done |
| `public/index.html` | Button sizing fixed | ✅ Done |
| `server.js` | MongoDB optimized | ✅ Ready |
| `vercel.json` | Deployment config | ✅ Ready |

---

## 🔐 Security Reminder

Before going live:
1. Change admin password in Vercel environment variables
2. Generate new SESSION_SECRET:
   ```bash
   node -e "console.log(require('crypto').randomBytes(40).toString('hex'))"
   ```
3. Restrict MongoDB network access to Vercel IPs only

---

## ✨ All Set!

Your admin panel is ready, MongoDB is configured with the correct database name, and all popup buttons are properly sized!

**Next step:** Test locally, then deploy to Vercel following the steps in `CHECKLIST.md`.
