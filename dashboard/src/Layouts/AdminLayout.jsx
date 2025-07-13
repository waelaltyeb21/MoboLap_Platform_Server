import React from "react";

export default function AdminLayout({ children }) {
  console.log("Here The Layout");
  return (
    <div className="Admin-Layout">
      {/* Side Bar */}
      <aside>This is the side bar</aside>

      {/* Main Content */}
      <main className="p-8">
        <header>Header Goes Here</header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
