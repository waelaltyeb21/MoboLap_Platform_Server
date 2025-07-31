import axios from "axios";

const AxiosConfig = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD,
});

export default AxiosConfig;
