"use client"
import React from "react";

const Error = ({ error }) => {
  console.error(error);
  return (
    <section>
      <h1>{error?.message || "Something Went Wrong!"}</h1>
    </section>
  );
};

export default Error;
