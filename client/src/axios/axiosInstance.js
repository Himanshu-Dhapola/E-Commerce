import axios from "axios";

export const BASE_URI_API = "https://easby-server.onrender.com";
const token = localStorage?.getItem("accessToken");

export const axiosInstance = axios.create({
  baseURL: BASE_URI_API,
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

