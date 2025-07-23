import React from "react";

const Footer = () => {
  const CurrentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center border-t border-t-slate-300 py-8">
      <div>جميع الحقوق محفوظة {CurrentYear}</div>
      {/* <IconCopyright />{" "} */}
    </footer>
  );
};

export default Footer;
