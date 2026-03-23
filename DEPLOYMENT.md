# Mediva Landing - Deployment Guide

## ✅ Current Status
- MongoDB URI configured in `.env`
- Server optimized for Vercel deployment
- Session security enhanced

---

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment with MongoDB"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the `vercel.json` configuration

### Step 3: Configure Environment Variables in Vercel
In Vercel dashboard → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://info_db_user:IqhAJ3wb9CSxTyeh@mediva.iaimvlq.mongodb.net/mediva_landing_db?retryWrites=true&w=majority&appName=mediva
ADMIN_EMAIL=mediva@admin.com
ADMIN_PASSWORD=Mediva@123
SESSION_SECRET=vcbievbevhbfeivfeiuebfhrbivehvsmediva2026securekey
NODE_ENV=production
```

### Step 4: Deploy
Click "Deploy" — Vercel will build and deploy your app!

---

## 🔧 Configure GoDaddy Domain (www.mediva-health.com)

### Option A: Using Vercel Nameservers (Recommended)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add: `www.mediva-health.com` and `mediva-health.com`
   - Vercel will show you nameserver addresses

2. **In GoDaddy:**
   - Log into GoDaddy → My Products
   - Find your domain → Click "DNS" or "Manage"
   - Change Nameservers to "Custom"
   - Enter Vercel's nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
   - Save changes

3. **Wait for propagation** (5 minutes to 48 hours)

### Option B: Using A Record + CNAME

1. **In Vercel Dashboard:**
   - Project Settings → Domains
   - Add both domains
   - Note the IP address shown

2. **In GoDaddy DNS Management:**
   - Add/Edit A Record:
     - Host: `@`
     - Points to: `[Vercel IP address]`
   - Add/Edit CNAME Record:
     - Host: `www`
     - Points to: `cname.vercel-dns.com`

---

## 📝 Important Notes

### MongoDB Atlas Configuration
Your current MongoDB URI is configured. Make sure:
- MongoDB Atlas cluster is running
- Network access allows connections from anywhere (`0.0.0.0/0`)
- Database user has read/write permissions

### Security Recommendations
Before going live:
1. ✅ Change `ADMIN_PASSWORD` to a strong password
2. ✅ Update `SESSION_SECRET` with a new random string (50+ chars recommended)
3. Enable MongoDB Atlas IP whitelist for production only

### Admin Dashboard Access
The admin dashboard is at: `/131233@dsdswe/@ceefeifnv`
- This obscure path provides basic security through obscurity
- Login with: `mediva@admin.com` / `Mediva@123` (CHANGE THIS!)

---

## 🧪 Testing Locally

```bash
npm install
npm run dev
```

Visit:
- Main site: http://localhost:3000
- Admin: http://localhost:3000/131233@dsdswe/@ceefeifnv

---

## 🔄 Updating After Deployment

```bash
# Make your changes
git add .
git commit -m "Update description"
git push origin main

# Vercel will auto-deploy on push to main branch
```

---

## ⚠️ Troubleshooting

### MongoDB Connection Fails
- Check MongoDB Atlas network access settings
- Verify connection string is correct
- Ensure IP whitelist includes `0.0.0.0/0` for Vercel

### Site Not Loading on Vercel
- Check Vercel Functions logs in dashboard
- Verify environment variables are set correctly
- Look for build errors in Vercel deployments tab

### Domain Not Working
- DNS propagation can take up to 48 hours
- Use tools like [whatsmydns.net](https://whatsmydns.net) to check propagation
- Clear browser cache or try incognito mode

---

## 📊 Alternative: Railway Deployment

If you prefer Railway over Vercel:

1. Push to GitHub (same as above)
2. Go to [railway.app](https://railway.app)
3. Create new project → Deploy from GitHub
4. Add environment variables (same as Vercel)
5. Railway will auto-deploy

Railway is better suited for apps with sessions and persistent connections.

---

## ✨ Features Working
- ✅ MongoDB integration with connection pooling
- ✅ JSON fallback if MongoDB unavailable
- ✅ Express session management
- ✅ Admin dashboard with authentication
- ✅ Submission API (Join/Contact forms)
- ✅ Static file serving
- ✅ Vercel serverless optimization
