### **Full-Stack (E-commerce Cart System)**

A full-stack e-commerce application that allows users to browse products, manage their cart, and make purchases. Built with React, Redux, TailwindCSS, Node.js, Express, and MongoDB.

## Table of Contents

- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Features](#features)
- [Environment Variables](#environment-variables)

## Project Setup

1.  **Clone the repository**

    ```
    git clone <repository-url>
    cd e-commerce-cart-system
    ```

2.  **Install dependencies for both frontend and backend**

    ```
     cd frontend
    npm install
    cd ../backend
    npm install
    ```

3.  **Set environment variables**

    - Frontend<br>
      In the frontend/.env file:

      ```
      REACT_APP_API_URL=http://localhost:4000/api
      ```

    - Backend<br>
      In the frontend/.env file:

      ```
      PORT=4000
      MONGO_URI=<your-mongodb-connection-string>
      JWT_SECRET=<your-jwt-secret>

      ```

4.  **Run the application**

    - Frontend

      Start the frontend React application:

      ```
        cd frontend
        npm start
      ```

    - Backend

      Start the backend Node.js Server

      ```
        cd backend
        npm start
      ```

## Technologies Used

- Frontend: React, Redux, TailwindCSS
- Backend: Node.js, Express, MongoDB
- Authentication: JWT for token-based authentication

## Features

- User Authentication: Register, login, and logout functionality.
- Product Management: Browse and view detailed product information.
- Cart Management: Add, update, and remove products in the cart.
- Checkout: Finalize purchases (add this feature as needed).

## Environment Variables

- REACT_APP_API_URL: URL for backend API connection.
- PORT: Port for the backend server.
- MONGO_URI: MongoDB connection string.
- JWT_SECRET: Secret key for JWT token generation.

## Available Scripts

- npm start: Start the development server for the frontend or backend.
- npm run build: Build the frontend for production.
- npm run dev: Start the backend with live reload.
