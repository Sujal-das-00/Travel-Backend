import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "../router/routes.js";
import { globalErrorHandler } from "../middleware/errohandeler.js";
import db from "../config/db.js";
import fs from "fs";
import path from "path";

/* ---------- ENV ---------- */
dotenv.config();

/* ---------- ENV VALIDATION ---------- */
if (!process.env.SESSION_SECRET) {
  console.error("❌ SESSION_SECRET is missing");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}

/* ---------- APP ---------- */
const app = express();

/* ---------- CORE MIDDLEWARE ---------- */
app.use(express.json());

/* ---------- CORS ---------- */
const allowedOrigins = [
  "https://satotra.com",
  "https://www.satotra.com",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

/* ---------- SESSION (MUST BE BEFORE ROUTES) ---------- */
const isProd = process.env.NODE_ENV === "production";

app.use(
  session({
    name: "admin-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

/* ---------- TEMP DIR ---------- */
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("✅ Created temp directory");
}

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("backend is running");
});

/* ---------- ROUTES ---------- */
app.use("/api", router);

/* ---------- ERROR HANDLER ---------- */
app.use(globalErrorHandler);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
