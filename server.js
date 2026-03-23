require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const session = require("express-session");
const mongoose = require("mongoose");
const Submission = require("./models/Submission");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");
const adminFile = path.join(publicDir, "admin", "index.html");
const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, "data");
const dataFile = path.join(dataDir, "submissions.json");

/** Obscure admin URL (exact path — use @ or %40 in browser) */
const ADMIN_PATH = "/131233@dsdswe/@ceefeifnv";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mediva@admin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mediva@123";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "mediva-change-me-in-production-min-32-chars!!";

let useMongo = false;

app.set("trust proxy", 1);

app.use(express.json({ limit: "256kb" }));

app.use(
  session({
    name: "mediva.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readSubmissionsFile() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeSubmissionsFile(list) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
}

function toApiEntry(doc) {
  if (doc._id) {
    return {
      id: doc._id.toString(),
      type: doc.type,
      createdAt:
        doc.createdAt instanceof Date
          ? doc.createdAt.toISOString()
          : doc.createdAt,
      data: doc.data,
    };
  }
  return {
    id: doc.id,
    type: doc.type,
    createdAt: doc.createdAt,
    data: doc.data,
  };
}

async function addSubmission(type, data) {
  if (useMongo) {
    const doc = await Submission.create({ type, data });
    return { id: doc._id.toString() };
  }
  const entry = {
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    data,
  };
  const list = await readSubmissionsFile();
  list.unshift(entry);
  await writeSubmissionsFile(list);
  return { id: entry.id };
}

async function listSubmissions() {
  if (useMongo) {
    const docs = await Submission.find().sort({ createdAt: -1 }).lean();
    return docs.map((d) =>
      toApiEntry({
        _id: d._id,
        type: d.type,
        createdAt: d.createdAt,
        data: d.data,
      })
    );
  }
  return await readSubmissionsFile();
}

async function deleteSubmission(id) {
  if (useMongo) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const r = await Submission.findByIdAndDelete(id);
    return !!r;
  }
  const list = await readSubmissionsFile();
  const next = list.filter((s) => s.id !== id);
  if (next.length === list.length) return false;
  await writeSubmissionsFile(next);
  return true;
}

function requireAdmin(req, res, next) {
  if (req.session && req.session.admin === true) return next();
  return res.status(401).json({ ok: false, error: "Unauthorized" });
}

/** Public: save landing form */
app.post("/api/submissions", async (req, res) => {
  try {
    const { type, ...rest } = req.body || {};
    if (type !== "Join" && type !== "Contact") {
      return res.status(400).json({ ok: false, error: "Invalid type" });
    }

    const { id } = await addSubmission(type, rest);
    return res.json({ ok: true, id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.session.admin = true;
    req.session.adminEmail = email;
    return res.json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: "Invalid credentials" });
});

app.post("/api/admin/logout", (req, res) => {
  if (!req.session) return res.json({ ok: true });
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.clearCookie("mediva.sid");
    res.json({ ok: true });
  });
});

app.get("/api/admin/me", (req, res) => {
  if (req.session && req.session.admin) {
    return res.json({ ok: true, email: req.session.adminEmail || ADMIN_EMAIL });
  }
  return res.status(401).json({ ok: false });
});

app.get("/api/submissions", requireAdmin, async (_req, res) => {
  try {
    const list = await listSubmissions();
    return res.json({ ok: true, submissions: list });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.delete("/api/submissions/:id", requireAdmin, async (req, res) => {
  try {
    const ok = await deleteSubmission(req.params.id);
    if (!ok) {
      return res.status(404).json({ ok: false, error: "Not found" });
    }
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

/** Block direct /admin/* access — dashboard only at secret path */
app.use((req, res, next) => {
  if (req.path === "/admin" || req.path.startsWith("/admin/")) {
    return res.status(404).type("text/plain").send("Not found");
  }
  next();
});

/** Admin SPA (obscure URL only) */
app.get(ADMIN_PATH, (_req, res) => {
  res.sendFile(adminFile);
});

app.use(express.static(publicDir));

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

async function start() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      // Configure mongoose for serverless/vercel
      await mongoose.connect(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      useMongo = true;
      console.log("✅ MongoDB connected successfully");
      console.log("Database:", mongoose.connection.db.databaseName);
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      console.error("⚠️ Falling back to JSON file storage.");
      console.error("💡 Tip: Check your MongoDB URI and network access settings.");
      useMongo = false;
      await ensureDataFile();
    }
  } else {
    console.warn("MONGODB_URI not set — using JSON file storage (data/submissions.json)");
    await ensureDataFile();
  }

  app.listen(port, () => {
    console.log(`✅ Mediva running on port ${port}`);
    console.log(`🔐 Admin dashboard: ${ADMIN_PATH}`);
    console.log(`💾 Storage: ${useMongo ? "MongoDB" : "JSON file"}`);
    console.log(`🌐 Local URL: http://localhost:${port}`);
    console.log(`\n📝 Test forms at: http://localhost:${port} (click Early Join or Contact)`);
  });
}

// Export for Vercel serverless
module.exports = app;

start();
