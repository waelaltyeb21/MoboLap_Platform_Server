import React from "react";

const NotDataFound = ({ data, message, children }) => {
  return (
    data?.length === 0 && (
      <>
        <article className="flex flex-col items-center justify-center gap-4 h-96">
          <h1 className="text-2xl font-semibold">{message}</h1>
          <div>{children}</div>
        </article>
      </>
    )
  );
};

export default NotDataFound;
