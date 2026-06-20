import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F5F6FA" }}>
      <Helmet>
        <title>{title || "NovaShop — Best Deals on Electronics"}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>
      <Header />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#111827",
            border: "1px solid #E5E7EB",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
          success: {
            iconTheme: { primary: "#FF4500", secondary: "#fff" },
          },
        }}
      />
      <main style={{ flex: 1, background: "#F5F6FA" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;