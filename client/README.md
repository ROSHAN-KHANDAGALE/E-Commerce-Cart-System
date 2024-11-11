# E-commerce Cart System - Frontend

This is the frontend for an e-commerce cart system, built with React, Redux, and TailwindCSS. The frontend includes a product listing page, product details, and a cart page where users can view and manage their selected items.

## Table of Contents

- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Environment Variables](#environment-variables)

## Project Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   Create a .env file in the root directory and add your frontend-specific variables:

   ```
   REACT_APP_API_URL=http://localhost:4000/api

   ```

4. **Run the application**
   ```
   npm start
   ```

## Technologies Used

- React for UI components
- Redux for state management
- TailwindCSS for styling
- React Router for navigation

## Available Scripts

- npm start: Start the development server.
- npm test: Run tests.
- npm run build: Build the project for production.

## Features

- Product Showcase: View a list of available products with details and images.
- Add to Cart: Add items to the shopping cart.
- Cart Management: View, increase, decrease, or remove items from the cart.
- User Authentication: Login and logout functionality.

## Environment Variables

REACT_APP_API_URL: URL for backend API connection.
