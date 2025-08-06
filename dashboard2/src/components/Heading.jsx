import React from "react";

const Heading = ({ title, children }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Heading;
