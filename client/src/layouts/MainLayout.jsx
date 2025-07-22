import Footer from "@/components/blocks/Footer";
import Header from "@/components/blocks/Header";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="Main-Layout">
      {/* Headers */}
      <Header />
      {/* Main Content */}
      <main className="px-32">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
