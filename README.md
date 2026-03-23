# Mediva — Landing + API + Admin (Railway & Vercel ready)

One **Node/Express** app serves:

- **Frontend:** `public/index.html` (marketing site)
- **API:** `/api/submissions`, `/api/admin/*`
- **Admin UI:** only at the **secret path** below (not under `/admin/`)

---

## Where to put environment variables

### On your computer (local)

1. In the **project root** — the same folder as `package.json` and `server.js`.
2. Copy the template:
   ```bash
   copy .env.example .env
   ```
   (Mac/Linux: `cp .env.example .env`)
3. Edit **`.env`** with real values.  
   **`.env` is gitignored** — never commit it.

The app loads `.env` automatically via **`dotenv`** (only fills variables that are not already set).

### On Railway (production)

1. Open your **Railway project** → select the **web service** (the one running this repo).
2. Go to **Variables** (or **Settings → Variables**).
3. **Add each variable** from the table below (click **New Variable**).

Railway injects these into `process.env` — you **do not** upload a `.env` file for production.

---

## Variables to add (checklist)

| Variable | Required? | What it does |
|----------|-----------|----------------|
| **`MONGODB_URI`** | **Strongly recommended** | MongoDB connection string. Forms + admin use this. If missing, data goes to `data/submissions.json` (lost on redeploy unless you use a volume). |
| **`SESSION_SECRET`** | **Yes on Railway** | Long random string (32+ chars). Used to sign admin session cookies. |
| **`ADMIN_EMAIL`** | Recommended | Admin login email (change from default). |
| **`ADMIN_PASSWORD`** | Recommended | Admin login password (use a strong password). |
| **`NODE_ENV`** | Auto | Railway usually sets `production` → secure cookies. |
| **`PORT`** | Auto | Railway sets this; don’t override unless you know why. |
| **`DATA_DIR`** | Optional | Only if you use **JSON file** storage and want a custom folder (e.g. mounted volume path). |

**Generate `SESSION_SECRET` (example):**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output into Railway as `SESSION_SECRET`.

---

## Local run

```bash
npm install
npm start
```

- Site: **http://localhost:3000**  
- Without `MONGODB_URI` in `.env`, submissions save to **`data/submissions.json`**.

---

## Deployment Options

This app can be deployed to **Vercel** or **Railway**:

- **Vercel**: Serverless functions, auto-scaling, great for static + API mix
- **Railway**: Traditional server, better for persistent sessions and WebSocket support

### Quick Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables (see table above)
4. Click Deploy!

See **QUICK_START.md** for detailed Vercel + GoDaddy domain setup.

---

## Admin dashboard (secret URL)

After deploy, open (use your real domain):

`https://YOUR-APP.up.railway.app/131233@dsdswe/@ceefeifnv`

Encoded form (same page):

`https://YOUR-APP.up.railway.app/131233%40dsdswe/%40ceefeifnv`

Login with **`ADMIN_EMAIL`** / **`ADMIN_PASSWORD`**.

`/admin/...` URLs return **404** on purpose.

---

## Railway deployment (step by step)

1. Push this repo to **GitHub**.
2. **Railway** → **New Project** → **Deploy from GitHub** → select the repo.
3. **Add MongoDB**
   - Either: **New** → **Database** → **MongoDB**, then copy the **Mongo URI** into your service as `MONGODB_URI`,  
   - Or: use **MongoDB Atlas** and paste the Atlas URI as `MONGODB_URI`.
   - Make sure the URI includes a database name path (example: `/mediva_landing_db`), since the app connects using the URI as-is.
4. On the **web service** → **Variables**, add at minimum:
   - `MONGODB_URI` = (paste connection string)
   - `SESSION_SECRET` = (long random hex/string)
   - `ADMIN_EMAIL` = your admin email
   - `ADMIN_PASSWORD` = strong password
5. **Settings → Networking → Generate Domain** (HTTPS).
6. Deploy runs **`npm start`** (see `railway.toml`).

Nixpacks detects Node, runs `npm install`, then `npm start`.

---

## Project layout

```
server.js          # Express + API + Mongo/file storage
models/Submission.js
public/            # Static files + index.html
public/admin/      # Admin SPA (served only via secret path)
.env.example       # Template — copy to .env locally
railway.toml       # Railway start command
```

---

## Assets (`public/images/`)

- `applogo.png` — logo & favicon  
- `Talk bubble.svg` — hero graphic  
- `public/assets/button.svg` — CTA / control background (used site-wide)  
