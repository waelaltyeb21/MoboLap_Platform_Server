import Link from "next/link";
import React from "react";

const Footer = () => {
  const CurrentYear = new Date().getFullYear();
  return (
    <footer className="border-t-2">
      <div className="py-8 px-32 flex items-center flex-col gap-2">
        <div>
          تم التصميم والتطوير بواسطة{" "}
          <Link
            href="https://instagram.com/wael_altyeb1"
            target="_blank"
            className="text-primary"
          >
            وائل الطيب
          </Link>
        </div>
        <div>جميع الحقوق محفوظة {CurrentYear}</div>
      </div>
    </footer>
  );
};

export default Footer;
