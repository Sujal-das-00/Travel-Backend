import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import router from "../router/routes.js";
import { globalErrorHandler } from "../middleware/errohandeler.js";
import db from "../config/db.js";
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors());
import fs from "fs";
import path from "path";
// ... other imports

// Create temp directory if it doesn't exist
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log("✅ Created temp directory");
}
app.use("/api",router)
app.get("/",(req,res)=>{
    res.send("backend is running test");
})
app.use(globalErrorHandler)
app.listen(3000,()=>{
    console.log("server is running");
})