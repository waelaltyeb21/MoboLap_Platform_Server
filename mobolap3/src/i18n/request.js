"use server";
import { setCookie } from "cookies-next";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const AllCookies = await cookies();
  const locale = AllCookies.get("NEXT_LOCALE")?.value || "ar";
  setCookie("NEXT_LOCALE", locale);
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
