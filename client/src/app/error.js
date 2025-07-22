"use client";
import React from "react";

const error = ({ error }) => {
  return (
    <section>
      <h1>{error?.message || "Something Went Wrong!"}</h1>
    </section>
  );
};

export default error;
