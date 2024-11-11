### **Backend (E-commerce Cart System)**

# E-commerce Cart System - Backend

This is the backend for the e-commerce cart system, developed with Node.js, Express, and MongoDB. It includes authentication, product management, and cart management.

## Table of Contents

- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Project Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```

3. Set environment variables

   Create a .env file in the root directory and add:

   ```
   PORT=4000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   API_SECRET=<your-api-secret>
   ```

4. **Run Server**
   ```
   npm start
   ```

## Technologies Used

- Node.js with Express.js for the backend server
- MongoDB for the database
- JWT for secure user authentication
  bcrypt for password hashing

## Available Scripts

- npm start: Start the production server.
- npm run dev: Start the development server with live reload.

## API Endpoints

- Auth Routes
  - POST /auth/register: Register a new user.
  - POST /auth/login: Log in a user
  - GET /auth/profile: Get user profile
- Product Routes

  - GET /products: Retrieve all products
  - GET /products/:id: Retrieve a specific product by ID
  - POST /products: Add a new product (admin only)

- Cart Routes

  - GET /cart: Retrieve user's cart items
  - POST /cart/add: Add item to cart
  - DELETE /cart/remove/:id: Remove item from cart

## Environment Variables

- PORT: Port on which the server runs.
- MONGO_URI: MongoDB connection string.
- JWT_SECRET: Secret for JWT token generation.
