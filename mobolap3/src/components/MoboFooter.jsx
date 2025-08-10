import { useTranslations } from "next-intl";
import React from "react";

const MoboFooter = () => {
  const CurrentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  return (
    <footer className="border-t py-8">
      <h3 className="text-center text-lg font-medium">
        {t("copyRights")} {CurrentYear}
      </h3>
    </footer>
  );
};

export default MoboFooter;
