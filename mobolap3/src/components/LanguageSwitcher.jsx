"use client";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    setLanguage(getCookie("NEXT_LOCALE") || "ar");
  }, []);

  const SwitchLanguage = async (val) => {
    const locale = val === "en" ? "ar" : "en";
    setCookie("NEXT_LOCALE", locale);
    (await import(`../messages/${locale}.json`)).default;
    router.refresh();
  };
  return (
    <div className="cursor-pointer" onClick={() => SwitchLanguage(language)}>
      {language === "en" ? "عربي" : "English"}
    </div>
  );
};

export default LanguageSwitcher;
