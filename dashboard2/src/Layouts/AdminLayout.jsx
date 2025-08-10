import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="Admin-Layout">
      {/* Side Bar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:mr-[16rem]">
        <Header />
        <div className="content p-4">{children}</div>
      </main>
    </div>
  );
}
