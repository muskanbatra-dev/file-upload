# Image Drive – File Upload & Sharing App

A full-stack file upload and sharing application (Google Drive–like) built using **React, Node.js, Express, and MongoDB**.

---

## ✨ Features

### Authentication

- JWT-based login & registration

### File Upload

- Upload single or multiple files (images, PDFs, CSVs, etc.)
- View file metadata (name, type, size, upload date)

### File Sharing

- Share files with specific users
- Generate shareable links (authenticated access only)

### Security

- Strict access control (owner / shared users)
- Unauthorized users cannot download files

### Bonus

- ✅ Link expiry support

---

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Storage**: AWS S3 (configurable)
- **Monorepo**: Turborepo

---

## 🚀 Run Locally

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd file-upload
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file inside `apps/backend`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/image-drive
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5174
```

### 4️⃣ Start MongoDB

```bash
mongod
```

_(or use a MongoDB Atlas connection string)_

### 5️⃣ Start the app

```bash
npm run dev
```

- Frontend → http://localhost:5173
- Backend
