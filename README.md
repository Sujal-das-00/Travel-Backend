# 🌍 Travel & Tour Management Backend

This repository contains the backend for a **travel and tour service website** built for a real client based in **Dehradun, India**, currently operating the business from **Dubai (UAE)**.

The system is designed to manage travel packages, customer enquiries, and tour guide requests through a secure, admin-controlled workflow.

---

## 📌 Project Summary

A Node.js and MongoDB–based backend that powers a travel platform with public APIs for customers and a protected admin dashboard for managing packages, guides, and requests. The project uses **session-based authentication** (no JWT) and follows a clean, scalable API structure suitable for single-admin operations.

---

## 🚀 Features

- Admin authentication using **MongoDB + bcrypt**
- Session-based login using `express-session`
- Secure admin-only APIs
- Travel package creation, update, and deletion
- Image upload support for packages (Multer)
- Customer enquiry management
- Tour guide registration and request handling
- Request status tracking (visited / unvisited)
- Centralized error handling
- Production-ready API structure

---

## 🔐 Authentication Flow

- Admin credentials are stored securely in MongoDB
- Passwords are hashed using **bcrypt**
- Authentication is handled via **server-side sessions**
- Admin-only routes are protected using middleware
- No JWT or frontend secrets are used

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** bcrypt, express-session  
- **File Uploads:** Multer  
- **Environment Variables:** dotenv  
- **Deployment Friendly:** Works on shared hosting (cPanel Node.js)

---

## 📂 Project Structure

