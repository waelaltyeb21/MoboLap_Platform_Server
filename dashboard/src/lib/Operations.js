"use client";
import AxiosConfig from "@/config/AxiosConfig";
import { useEffect, useState } from "react";

const SendDataToServer = async (Url, Method, Data) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const PostData = async (
    config = { url: Url, method: Method, data: Data }
  ) => {
    try {
      const res = await AxiosConfig(config);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setError(false);
        return res.data;
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { PostData, loading, error };
};

export default SendDataToServer;
