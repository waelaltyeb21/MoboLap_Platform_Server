import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="Admin-Layout grid grid-cols-12">
      {/* Side Bar */}
      <div className="hidden sm:block sm:col-span-2 h-screen p-8 border-l-1">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="col-span-12 sm:col-span-10">
        <Header />
        <div className="content p-4">{children}</div>
      </main>
    </div>
  );
}
