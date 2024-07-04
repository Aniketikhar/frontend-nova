import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Toaster />
      <main className="bg-body-secondary" style={{ minHeight: "70vh"}}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;