import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute.js";
import AdminDashboard from "../components/AdminDashboard.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import Profile from "../components/Profile.jsx";
import Cart from "../components/Cart.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/register",
    exact: true,
    element: (
      <MainLayout>
        <SignUp />
      </MainLayout>
    ),
  },
  {
    path: "/dashboard",
    exact: true,
    element: (
      <ProtectedRoute role="user">
        <MainLayout>
          <Home />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    exact: true,
    element: (
      <ProtectedRoute role="user">
        <MainLayout>
          <Profile />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart-orders",
    exact: true,
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    exact: true,
    element: (
      <ProtectedRoute role="admin">
        <MainLayout>
          <AdminDashboard />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
]);

export default route;
