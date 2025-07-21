import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="Main-Layout">
      {/* Headers */}
      {/* Main Content */}
      <main className="p-8">{children}</main>
    </div>
  );
};

export default MainLayout;
