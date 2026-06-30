import { AxiosHeaders } from "axios";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem("token");

  if (!token) {
    return config;
  }

  const headers = AxiosHeaders.from(config.headers);
  headers.set("Authorization", `Bearer ${token}`);
  config.headers = headers;

  return config;
});

export default api;
