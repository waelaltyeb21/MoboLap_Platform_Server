"use client";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const language = getCookie("NEXT_LOCALE") || "ar";

  const SwitchLanguage = async (val) => {
    const locale = val === "en" ? "ar" : "en";
    setCookie("NEXT_LOCALE", locale);
    (await import(`../messages/${locale}.json`)).default;
    router.refresh();
  };
  return (
    <div>
      <Languages
        onClick={() => SwitchLanguage(language)}
        className="cursor-pointer"
      />
      {/* {language === "en" ? "عربي" : "English"} */}
    </div>
  );
};

export default LanguageSwitcher;
