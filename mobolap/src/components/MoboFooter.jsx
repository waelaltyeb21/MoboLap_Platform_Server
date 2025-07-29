import React from "react";

const MoboFooter = () => {
  const CurrentYear = new Date().getFullYear();
  return (
    <footer className="border-t pt-8">
      <h3 className="text-center text-lg font-medium">
        جميع الحقوق محفوظة لمتجر موبولاب لسنة {CurrentYear}
      </h3>
    </footer>
  );
};

export default MoboFooter;
