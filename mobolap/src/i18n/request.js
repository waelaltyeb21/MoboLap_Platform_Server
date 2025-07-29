import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const AllCookies = await cookies();
  const locale = AllCookies.get("NEXT_LOCALE")?.value || "ar";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
