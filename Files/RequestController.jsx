import AxiosConfig from "@/config/AxiosConfig";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const RequestController = async (url, method = "GET", data) => {
  let id = null;
  if (method !== "GET") {
    id = notifications.show({
      loading: true,
      title: "جار تحميل البيانات",
      message: "يرجى الانتظار...",
      autoClose: false,
      position: "top-center",
      withCloseButton: false,
    });
  }
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
    ) {
      notifications.update({
        id,
        color: "teal",
        title: "تم تحميل البيانات بنجاح",
        message: response?.data?.message || "تم تحميل البيانات بنجاح",
        icon: <IconCheck size={18} />,
        position: "top-center",
        loading: false,
        autoClose: 2000,
      });
      return { data: response?.data, status: response?.status };
    }
  } catch (error) {
    notifications.update({
      id,
      color: "teal",
      title: "حدث خطأ",
      message: error.response?.data?.message || "حدث خطأ أثناء تحميل البيانات",
      icon: <IconX size={18} />,
      position: "top-center",
      loading: false,
      autoClose: 2000,
    });
    console.error("Error in RequestController:", error);
    return null;
  }
};
