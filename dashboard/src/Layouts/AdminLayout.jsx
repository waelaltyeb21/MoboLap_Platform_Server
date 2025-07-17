import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AdminLayout({ children }) {
  console.log("Here The Layout");
  return (
    <div className="Admin-Layout grid grid-cols-12">
      {/* Side Bar */}
      <div className="col-span-2 h-screen p-8 border-l-1">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="col-span-10">
        <Header />
        <div className="content p-4">{children}</div>
      </main>
    </div>
  );
}
