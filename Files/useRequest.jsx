"use client";
import { AxiosConfig } from "@/config/AxiosConfig";
import { useCallback, useReducer } from "react";

const useRequest = () => {
  // Initial State
  const initialState = {
    FetchedData: null,
    Loading: false,
    Error: false,
  };

  // State Changes
  const RequestState = (state, action) => {
    switch (action?.type) {
      case "REQUEST_INIT":
        return { ...state, Loading: true, Error: false };
      case "REQUEST_SUCCESS":
        return { ...state, Loading: false, FetchedData: action?.payload };
      case "REQUEST_FAILURE":
        return { ...state, Loading: false, Error: action?.payload };
      default:
        break;
    }
  };

  // State Controller
  const [state, dispatch] = useReducer(RequestState, initialState);

  // Function To Send Request
  const SendRequest = useCallback(async (config, JobToDo) => {
    // GET Request Abort Config
    const controller = new AbortController();
    const signal = controller.signal;
    if (config.method == "GET") config = { ...config, signal: signal };

    console.log("Config: ", config);
    // Start Loading...
    dispatch({ type: "REQUEST_INIT" });

    try {
      // setTimeout(async () => {
      await AxiosConfig(config)
        .then((response) => {
          if (response.status === 200 || 201) {
            dispatch({ type: "REQUEST_SUCCESS", payload: response?.data });
            // Implement The Function
            JobToDo != undefined ? JobToDo(response?.data) : null;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          dispatch({
            type: "REQUEST_FAILURE",
            payload: error?.response?.data || error?.msg,
          });

          if (error?.response?.status === 429) {
            console.error(error?.response);
          }
        });
      // }, 2000);
    } catch (error) {
      if (error.name == "AbortError") {
        throw new Error("Fetching Data Has Been Aborted");
        // console.log("Fetch Aborted..!");
      } else {
        dispatch({
          type: "REQUEST_FAILURE",
          payload: error?.response?.data || error?.msg,
        });
      }
      // console.log("Error: ", error);
      console.log("Error 2");
      console.log(error?.response?.data);
    }
    config.method === "GET" ? () => controller.abort() : null;
  }, []);

  return { ...state, SendRequest };
};

export default useRequest;
