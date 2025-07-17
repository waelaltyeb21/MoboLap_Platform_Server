import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AdminLayout({ children }) {
  console.log("Here The Layout");
  return (
    <div className="Admin-Layout">
      {/* Side Bar */}
      <div className="h-screen p-8 fixed bg-gray-800 text-slate-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="mr-56">
        <Header />
        <div className="content p-4">{children}</div>
      </main>
    </div>
  );
}
