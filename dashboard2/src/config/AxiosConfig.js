import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
const token = getCookie("token");
console.log(token)
const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

AxiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Original Request: ", originalRequest);

    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`;
        const { data } = await axios.post(url, {}, { withCredentials: true });

        console.log("Refresh Token: ", data);

        setCookie("token", data.accessToken);
        // Retry with new token
        originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;
        return AxiosConfig(originalRequest);
      } catch (error) {}
    }

    return Promise.reject(err);
  }
);

export default AxiosConfig;
