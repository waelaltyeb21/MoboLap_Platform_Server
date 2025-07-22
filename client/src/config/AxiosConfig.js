import axios from "axios";

// Add Token To Header
const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

export default AxiosConfig;
