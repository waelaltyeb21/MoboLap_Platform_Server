"use server";

import AxiosConfig from "@/config/AxiosConfig";
import { cookies } from "next/headers";

const GetData = async (url) => {
  const AllCookies = await cookies();
  const token = AllCookies.get("token")?.value;
  try {
    const res = await AxiosConfig({
      url,
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (res.status !== 200) return null;
    console.log(res.status);
    return res.data;
  } catch (error) {
    return null;
  }
};

export default GetData;
