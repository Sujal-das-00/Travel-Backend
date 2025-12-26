import Admin from "../db_models/login.schema.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.adminId = admin._id.toString();
    req.session.isAdmin = true;

    req.session.save(err => {
        if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ message: "Login failed" });
        }

        return res.json({ success: true });
    });
};
