import MoboHeader from "@/components/MoboHeader";
import React from "react";

const MoboLayout = ({ children }) => {
  return (
    <div className="Mobo-Layout">
      {/* Header */}
      <MoboHeader />
      {/* Main Content */}
      <main className="sm:px-32">{children}</main>
      {/* Footer */}
    </div>
  );
};

export default MoboLayout;
