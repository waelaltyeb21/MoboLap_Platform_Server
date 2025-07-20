"use client";
import AxiosConfig from "@/config/AxiosConfig";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchData = async (getOptions = { method: "GET" }) => {
    console.log("Fetching...");
    AxiosConfig(url, getOptions)
      .then((response) => {
        if (
          response.request.status != 200 &&
          response.request.readyState != 4
        ) {
          throw new Error("Could Not Fetch Data From Server !");
        }
        return response.data;
      })
      .then((responseData) => {
        setData(responseData);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        if (err.name == "AbortError") {
          console.log("Fetch Aborted..!");
        } else {
          console.log(err);
          setError(true);
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getOptions = {
      method: "GET",
      signal: signal,
    };
    FetchData(getOptions);
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error, refresh: FetchData };
};

export default useFetch;
