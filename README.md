# MediaStack Backend (Backend_YT)

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
</div>

## 📌 Overview

MediaStack Backend (also referred to as `Backend_YT`) is an industry-standard, robust REST API built using the **MERN** stack (focusing on Node.js, Express, and MongoDB). It powers a fully-featured media hosting and streaming application similar to YouTube.

This project is built with standard software engineering principles, incorporating advanced features like JWT-based authentication, cloud-based asset management with Cloudinary, file handling via Multer, and complex database aggregation pipelines.

## 🚀 Key Features

- **Advanced Authentication & Authorization**: Secure JWT-based authentication (Access & Refresh tokens), password hashing using bcrypt, and role-based middleware.
- **Media Management**: Robust handling of video and image uploads using Multer. Direct integration with **Cloudinary** for scalable, cloud-based media storage and delivery.
- **User Engagement System**: Complete ecosystems for:
  - Video likes and dislikes
  - Nested commenting system
  - Channel subscriptions and follower count tracking
- **Optimized Data Fetching**: Utilizes `mongoose-aggregate-paginate-v2` for highly efficient pagination of large MongoDB aggregation queries.
- **Error Handling & API Responses**: Standardized utility classes (`ApiError`, `ApiResponse`) for consistent JSON responses across all controllers.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (ES Modules)
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **File Handling**: Multer & Cloudinary
- **Code Formatting**: Prettier

## 📂 Project Structure

```text
src/
├── controllers/      # Business logic (users, videos, likes, comments, subscriptions)
├── db/               # Database connection setup
├── middlewares/      # Express middlewares (auth, multer configuration)
├── models/           # Mongoose schemas (User, Video, Comment, Like, Subscription)
├── routes/           # API route definitions
├── utils/            # Shared utilities (AsyncHandler, Cloudinary upload, Error/Response handling)
├── app.js            # Express app configuration & middleware binding
├── constants.js      # App-wide constants (DB Name)
└── index.js          # Application entry point & server initialization
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For media uploads)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Backend_YT
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root of `Backend_YT` with the following variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=*
   
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🛣️ Core API Routes

The API is versioned (`/api/v1`). Below is a high-level summary of the available endpoints:

- **Users** (`/api/v1/users`): Registration, login, logout, profile management, watch history.
- **Videos** (`/api/v1/videos`): Upload videos, update details, fetch video by ID, list videos with pagination.
- **Likes** (`/api/v1/likes`): Toggle likes on videos, comments, or tweets.
- **Comments** (`/api/v1/comments`): Add, update, delete, and list comments on a video.
- **Subscriptions** (`/api/v1/subscriptions`): Subscribe to channels, view subscriber lists, view subscribed channels.

## 🤝 Contributing

This is a professional boilerplate and learning environment. To contribute:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

Distributed under the ISC License. See `package.json` for more information.
