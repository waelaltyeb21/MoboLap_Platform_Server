import React from "react";
import NextNProgress from "nextjs-toploader";

const RouteLoader = () => {
  return (
    <div className="relative z-[9999]">
      <NextNProgress
        color="#4f46e5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    </div>
  );
};

export default RouteLoader;
