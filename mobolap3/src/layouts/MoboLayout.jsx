import MoboFooter from "@/components/MoboFooter";
import MoboHeader from "@/components/MoboHeader";
import RouteLoader from "@/components/RouteLoader";
import React from "react";
import { Toaster } from "react-hot-toast";

const MoboLayout = ({ locale, children }) => {
  return (
    <div className="Mobo-Layout">
      {/* Route Loader */}
      <RouteLoader />
      {/* Toast Provider */}
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Fixed Mode Button */}
      {/* Header */}
      <MoboHeader />
      {/* Main Content */}
      <main className="px-8 md:px16 lg:px-32 py-20">{children}</main>
      {/* Footer */}
      <MoboFooter />
    </div>
  );
};

export default MoboLayout;
