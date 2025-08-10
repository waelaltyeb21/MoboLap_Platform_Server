import axios from "axios";
import Cookies from "js-cookie";

const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 10000,
});

AxiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.error("Axios Error: ", error);
    if (!error.config) {
      // console.error("No config found in error:", error);
      return Promise.reject(error);
    }
    console.log("Refresh Token");
    const originalRequest = error.config;
    // console.log("Original Request: ", originalRequest);

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`;
        const { data } = await axios.post(url, {}, { withCredentials: true });

        // console.log("Refresh Token: ", data);
        if (data?.token) {
          Cookies.set("token", data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return AxiosConfig(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;
