import axios from "axios";

export const BASE_URI_API = "https://easby-server.onrender.com";
const getToken = () => localStorage?.getItem("accessToken");
console.log(getToken());

export const axiosInstance = axios.create({
  baseURL: BASE_URI_API,
  headers: { Authorization: `Bearer ${getToken()}` },
  withCredentials: true,
});

