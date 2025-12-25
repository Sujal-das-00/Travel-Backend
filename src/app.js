import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import router from "../router/routes.js";
import { globalErrorHandler } from "../middleware/errohandeler.js";
import db from "../config/db.js";
import fs from "fs";
import path from "path";
import MongoStore from "connect-mongo";
dotenv.config();
const app = express();

/* ---------- CORE MIDDLEWARE ---------- */
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

/* ---------- SESSION (MUST BE BEFORE ROUTES) ---------- */
app.use(
  session({
    name: "admin-session",
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: false, // true if HTTPS
      sameSite: "lax",
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

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("backend is running test");
});

app.use("/api", router);

/* ---------- ERROR HANDLER ---------- */
app.use(globalErrorHandler);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
