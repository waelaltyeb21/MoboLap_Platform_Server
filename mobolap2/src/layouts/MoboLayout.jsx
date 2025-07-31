import MoboFooter from "@/components/MoboFooter";
import MoboHeader from "@/components/MoboHeader";
import React from "react";
import { Toaster } from "react-hot-toast";

const MoboLayout = ({ children }) => {
  return (
    <div className="Mobo-Layout">
      {/* Toast Provider */}
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Header */}
      <MoboHeader />
      {/* Main Content */}
      <main className="px-8 sm:px-32 py-20">{children}</main>
      {/* Footer */}
      <MoboFooter />
    </div>
  );
};

export default MoboLayout;
