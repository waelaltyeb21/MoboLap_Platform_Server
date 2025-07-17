import React from "react";

const NotDataFound = ({ data, message, children }) => {
  return (
    data?.length === 0 && (
      <>
        <div>{children}</div>
        <article className="flex items-center justify-center h-96">
          <h1 className="text-2xl font-semibold">{message}</h1>
        </article>
      </>
    )
  );
};

export default NotDataFound;
