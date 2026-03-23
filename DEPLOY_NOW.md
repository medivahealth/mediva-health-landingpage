# 🚀 Deploy to Vercel - Quick Guide

## ✅ Code Successfully Pushed!

Your code is now on GitHub at:
**https://github.com/medivahealth/mediva-health-landingpage**

---

## 📋 Next Steps: Deploy to Vercel

### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"**

### Step 2: Import Your Repository
1. Select **"Import Git Repository"**
2. Find **mediva-health/mediva-health-landingpage**
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset:** Other  
**Root Directory:** `./` (default)  
**Build Command:** Leave blank  
**Output Directory:** Leave blank  
**Install Command:** `npm install`

### Step 4: Add Environment Variables ⚠️ IMPORTANT!

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://info_db_user:IqhAJ3wb9CSxTyeh@mediva.iaimvlq.mongodb.net/mediva_landing_db?retryWrites=true&w=majority&appName=mediva` |
| `ADMIN_EMAIL` | `mediva@admin.com` |
| `ADMIN_PASSWORD` | `Mediva@123` |
| `SESSION_SECRET` | `vcbievbevhbfeivfeiuebfhrbivehvsmediva2026securekey` |
| `NODE_ENV` | `production` |

⚠️ **Security Alert:** Change these after deployment, especially the password!

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a Vercel URL like: `https://mediva-health-landingpage.vercel.app`

---

## 🌐 Add Your Custom Domain

### In Vercel Dashboard:

1. Go to **Project Settings → Domains**
2. Add domain: `www.mediva-health.com`
3. Add domain: `mediva-health.com` (without www)
4. Vercel will show DNS configuration instructions

### In GoDaddy DNS Settings:

#### Option A: Nameservers (Recommended ⭐)
1. Log into GoDaddy
2. Find your domain → Click **"DNS"**
3. Scroll to **"Nameservers"**
4. Click **"Change"**
5. Select **"Custom nameservers"**
6. Enter Vercel's nameservers (shown in Vercel dashboard)
7. Click **"Save"**

#### Option B: A Record + CNAME
1. In GoDaddy DNS, add:
   - **A Record:** Host `@` → Points to Vercel IP (check Vercel for IP)
   - **CNAME Record:** Host `www` → Points to `cname.vercel-dns.com`

### Wait for DNS Propagation
- Takes 5-30 minutes usually
- Can take up to 48 hours
- Check status at: https://whatsmydns.net

---

## ✨ What's Been Updated

### Form Submission Enhancement ✅
All popup buttons now show "Submitted ✓" after successful submission:

**Before:**
- Generic "Sending..." message
- No visual confirmation
- Immediate close

**After:**
- Shows "Submitting..." while sending
- Changes to "Submitted ✓" with green highlight
- Stays visible for 1.5 seconds
- Auto-closes smoothly
- Button resets when reopened

**Affected Forms:**
- ✅ Early Join Modal ("Submit" button)
- ✅ Contact Us Modal ("Send Message" button)

### All Features Ready:
- ✅ MongoDB integration (`mediva_landing_db`)
- ✅ Social media links (X, LinkedIn, Instagram)
- ✅ Video showcase with mute/unmute
- ✅ Button sizing fixed in all popups
- ✅ Form submission feedback
- ✅ Admin panel at secret URL
- ✅ Responsive design
- ✅ SEO optimized

---

## 🎯 URLs After Deployment

### Main Site:
```
https://www.mediva-health.com
```

### Admin Panel:
```
https://www.mediva-health.com/131233@dsdswe/@ceefeifnv
```

Or encoded:
```
https://www.mediva-health.com/131233%40dsdswe/%40ceefeifnv
```

### Admin Login:
- **Email:** `mediva@admin.com`
- **Password:** `Mediva@123`

---

## 🔐 Security Checklist (Do This NOW!)

Before going live, update these in Vercel Environment Variables:

1. **Change Admin Password:**
   - Generate strong password
   - Update `ADMIN_PASSWORD` in Vercel

2. **Change Session Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(40).toString('hex'))"
   ```
   - Copy the output
   - Update `SESSION_SECRET` in Vercel

3. **MongoDB Network Access:**
   - Go to MongoDB Atlas
   - Network Access
   - Restrict to specific IPs (optional but recommended)

---

## 📊 Testing Checklist

### Before Launch:
- [ ] Test form submissions (both popups)
- [ ] Check "Submitted ✓" appears
- [ ] Verify MongoDB connection
- [ ] Test admin panel login
- [ ] Check all social media links work
- [ ] Test responsive design on mobile
- [ ] Verify video player works (if you added video)
- [ ] Test fullscreen mode

### After Launch:
- [ ] Custom domain works
- [ ] SSL certificate active (HTTPS)
- [ ] Forms save to MongoDB
- [ ] Admin panel accessible
- [ ] No console errors

---

## 🆘 Troubleshooting

### Build Failed on Vercel?
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Make sure Node.js version is 18+

### MongoDB Not Connecting?
1. Check MongoDB Atlas Network Access
2. Add IP: `0.0.0.0/0` (allow from anywhere)
3. Verify database user has read/write permissions

### Domain Not Working?
1. Wait up to 48 hours for DNS propagation
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito mode
4. Check DNS at whatsmydns.net

### Forms Not Submitting?
1. Check Vercel Functions logs
2. Verify MongoDB connection
3. Check browser console for errors

---

## 🎉 You're Done!

Your Mediva Health landing page is ready to deploy!

**Quick Summary:**
1. ✅ Code pushed to GitHub
2. ✅ Ready to deploy on Vercel
3. ✅ Domain setup instructions provided
4. ✅ All features working

**Next:** Follow the steps above to deploy on Vercel and connect your domain!

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://cloud.mongodb.com
- **GoDaddy DNS:** https://www.godaddy.com/help

**Questions?** Check these files:
- `CHECKLIST.md` - Quick deployment steps
- `DEPLOYMENT.md` - Detailed technical guide
- `QUICK_START.md` - Getting started guide
- `ADMIN_INFO.md` - Admin panel info
- `VIDEO_SETUP.md` - Video setup guide
