import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Page Not Found - 404</h1>
      <Link href="/" className="text-blue-600 underline underline-offset-4">
        Go Back To Home Page
      </Link>
    </section>
  );
};

export default NotFound;
