import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      <Header />
      <main className="flex-1 p-5 text-gray-800">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
