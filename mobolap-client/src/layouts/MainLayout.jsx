import Footer from "@/components/blocks/Footer";
import Header from "@/components/blocks/Header";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="Main-Layout">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-32">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
