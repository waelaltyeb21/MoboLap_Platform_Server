"use client";
import React from "react";

const Error = ({ error }) => {
  console.error("Error: ", error?.message);
  return (
    <section className="min-h-full min-w-full flex justify-center items-center">
      <h1 className="text-xl font-semibold">Something Went Wrong</h1>
      <p>Please Check The Console Log</p>
    </section>
  );
};

export default Error;
