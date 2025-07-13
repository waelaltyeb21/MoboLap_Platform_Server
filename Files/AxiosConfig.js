import axios from "axios";
import { getCookie } from "cookies-next/client";
const token = getCookie("token");

// Add Token To Header
const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

AxiosConfig.interceptors.request.use((config) => {
  console.log("Config: ", config, " Token: ", token);
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default AxiosConfig;
