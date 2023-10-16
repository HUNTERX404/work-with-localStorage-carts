import Axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {toast} from "react-hot-toast";

const axios: AxiosInstance = Axios.create({
  baseURL: "https://api.escuelajs.co",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

axios.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const TOKEN: string | null = localStorage?.getItem("token") || null;
    request.headers["Authorization"] = `Bearer ${TOKEN}`;
    return request;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.message === "Network Error") {
      toast.error("Check your internet connection");
    } else if (+error?.response?.status === 404) {
      //404
      toast.error("The requested data hasn't been found");
      // notFound();
    } else if (+error?.response?.status === 401) {
      //401
      toast.error("You have no permission to access this data");
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/login"); //redirect("/login");
    } else if (+error?.response?.status === 403) {
      //403
      toast.error("Accessing this data is forbidden");
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/home");
    } else if (+error?.response?.status === 500) {
      //500
      toast.error(error?.response?.data?.message);
    } else if (+error?.response?.status === 422) {
      //422
      toast.error(error?.response?.data?.message);
    } else toast.error("Unknown error occurred");
    return Promise.reject(error);
  }
);

export default axios;
