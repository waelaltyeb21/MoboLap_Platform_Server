import React from "react";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <article className="text-center mb-10">
      <h1 className="text-2xl lg:text-3xl font-medium mb-2">
        <q className="text-indigo-600">
          <span className="px-4 text-foreground">{title}</span>
        </q>
      </h1>
      <p className="text-lg">{subtitle}</p>
    </article>
  );
};

export default SectionHeading;
