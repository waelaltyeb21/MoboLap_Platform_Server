import AxiosConfig from "@/config/AxiosConfig";
import Cookies from "js-cookie";

export const RequestController = async (url, method = "GET", data = {}) => {
  try {
    console.log("url: ", url);
    if (!url) throw new Error("URL is required parameter");

    const token = Cookies.get("token");
    const config = {
      url,
      method,
      headers: {},
    };

    // Only add data for methods that typically have a body
    if (method !== "GET" && method !== "HEAD") {
      config.data = data;
    }

    console.log("Config: ", config);
    // Only add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await AxiosConfig(config);

    // More comprehensive success status check
    if (response?.status >= 200 && response?.status < 300) {
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    }

    throw new Error(`Request failed with status ${response?.status}`);
  } catch (error) {
    console.error("RequestController error:", {
      url,
      method,
      error: error.message,
      response: error.response?.data,
    });

    // Return error details instead of null for better error handling
    return {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
};
