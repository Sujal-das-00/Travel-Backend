# 🌍 Travel & Tour Management Backend

A comprehensive backend solution for travel and tour service platforms. Built for a client based in Dehradun, India, currently operating from Dubai (UAE), this system manages travel packages, customer enquiries, and tour guide registrations through a secure admin-controlled interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication & Security](#authentication--security)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Project Overview

This backend system provides:

- **Public-facing API** for customers to browse travel packages and submit enquiries
- **Secure admin dashboard backend** to manage packages, guides, and customer requests
- **Request-tracking mechanism** to mark enquiries as visited/processed
- **File upload support** for package images
- **Session-based authentication** for simplicity and security (no JWT complexity)

Built with scalability and maintainability in mind while keeping the operational workflow simple for single-admin businesses.

## ✨ Features

### Core Functionality

- ✅ Travel package creation, update, and deletion
- ✅ Image upload for travel packages
- ✅ Customer enquiry management
- ✅ Tour guide registration & approval workflow
- ✅ Admin-only dashboard APIs
- ✅ Request status tracking (visited/unvisited)
- ✅ Centralized error handling

### Admin Features

- Manage travel packages (CRUD operations)
- Review and approve tour guide registrations
- Track customer enquiries and mark as processed
- Manage package images and media
- Session-based secure access

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | bcrypt + express-session |
| **File Uploads** | Multer |
| **Environment** | dotenv |
| **Deployment** | Node.js server (cPanel-compatible) |

## 🔐 Authentication & Security

- **Admin authentication** using MongoDB + bcrypt
- **Session-based login** via express-session
- **Admin-only routes** protected with middleware
- **No JWT complexity** - simple session management
- **Secure file upload handling** with Multer
- **Password hashing** for all stored credentials

## 📦 Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Travel_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration))

5. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_db
MONGO_DB_NAME=travel_management

# Session
SESSION_SECRET=your_session_secret_key_here

# File Upload
MAX_FILE_SIZE=5000000
UPLOAD_DIR=./uploads

# Admin
ADMIN_EMAIL=admin@example.com
```

## 📡 API Overview

### Authentication Endpoints

- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/logout` - Admin logout
- **GET** `/api/auth/profile` - Get admin profile (protected)

### Travel Packages

- **GET** `/api/packages` - List all packages (public)
- **GET** `/api/packages/:id` - Get package details (public)
- **POST** `/api/admin/packages` - Create package (admin only)
- **PUT** `/api/admin/packages/:id` - Update package (admin only)
- **DELETE** `/api/admin/packages/:id` - Delete package (admin only)

### Customer Enquiries

- **POST** `/api/enquiries` - Submit enquiry (public)
- **GET** `/api/admin/enquiries` - List enquiries (admin only)
- **PATCH** `/api/admin/enquiries/:id/status` - Mark as visited (admin only)

### Tour Guides

- **POST** `/api/guides/register` - Register as guide (public)
- **GET** `/api/admin/guides` - List guide registrations (admin only)
- **PATCH** `/api/admin/guides/:id/approve` - Approve guide (admin only)

### Image Upload

- **POST** `/api/admin/packages/:id/upload-image` - Upload package image (admin only)

## 📁 Project Structure

```
Travel_Backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/      # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── app.js           # Express app setup
├── uploads/             # User-uploaded files
├── .env.example         # Environment template
├── package.json         # Dependencies
└── server.js            # Entry point
```

## 🚀 Deployment

### cPanel Deployment

1. Upload project files to your hosting account
2. Install Node.js via cPanel's "Setup Node.js App"
3. Configure environment variables in `.env`
4. Set up MongoDB connection (Atlas recommended)
5. Configure domain/subdomain routing
6. Restart the Node.js application

### Docker (Optional)

```bash
docker build -t travel-backend .
docker run -p 5000:5000 --env-file .env travel-backend
```

## 🎯 Use Cases

This system is ideal for:

- Small to mid-sized travel agencies
- Single-admin operations
- Businesses managing tours across multiple regions
- Owners operating remotely (India ↔ UAE)
- Platforms requiring simple, session-based authentication

## 📈 Project Status

- ✅ **Actively used** for a real client
- ✅ **Production-ready** backend implementation
- ✅ **Designed for extension** with frontend dashboards or mobile apps
- ✅ **Scalable architecture** for future growth

## 🤝 Contributing

This is a client-specific project. For contributions or modifications, please contact the development team.

## 📝 License

Private project for client use.

## 📞 Support

For issues or questions about this backend, please reach out to the development team.

---

**Built with ❤️ for travel and tour management**
