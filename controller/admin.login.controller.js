import bcrypt from "bcrypt";
import Admin from "../db_models/login.schema.js";

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(admin._id);
    req.session.adminId = admin._id;
    req.session.isAdmin = true;

    res.json({ success: true });
};
