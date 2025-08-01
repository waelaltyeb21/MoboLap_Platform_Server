"use server";
import AxiosConfig from "../config/AxiosConfig";

const GetData = async (url) => {
  try {
    const response = await AxiosConfig({ url: url, method: "GET" });
    if (response.status !== 200) return null;
    return response.data;
  } catch (error) {
    return null;
  }
};

export default GetData;
