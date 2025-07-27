import MoboFooter from "@/components/MoboFooter";
import MoboHeader from "@/components/MoboHeader";
import React from "react";

const MoboLayout = ({ children }) => {
  return (
    <div className="Mobo-Layout">
      {/* Header */}
      <MoboHeader />
      {/* Main Content */}
      <main className="px-8 sm:px-32">{children}</main>
      {/* Footer */}
      <MoboFooter />
    </div>
  );
};

export default MoboLayout;
