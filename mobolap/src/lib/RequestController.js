import AxiosConfig from "@/config/AxiosConfig";

export const RequestController = async (url, method = "GET", data = {}) => {
  try {
    if (!url) {
      throw new Error("URL is required parameter");
    }
    const response = await AxiosConfig({
      url,
      method,
      data,
    });

    if (!response || !response.data) {
      throw new Error("No data received from the server");
    }
    if (
      response.statusText === "OK" ||
      response.status === 200 ||
      response.status === 201
    )
      return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error("Error in RequestController:", error);
    return null;
  }
};
