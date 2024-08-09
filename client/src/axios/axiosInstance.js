import axios from "axios";

export const BASE_URI_API = "http://localhost:5000";
const token = localStorage.getItem("accessToken");

export const axiosInstance = axios.create({
  baseURL: BASE_URI_API,
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     config.headers.Authorization =
//       !config._retry && accessToken
//         ? `Bearer ${accessToken}`
//         : config.headers.Authorization;
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log("interceptor error:", error.response.status);
//     const originalRequest = error.config;
//     console.log("errorrrr:", error);
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");

//       console.log("refreshTokennnnnn: ", refreshToken);

//       try {
//         const response = await axios.post(
//           `${BASE_URI_API}/api/v1/customer/refresh-token`,
//           { refreshToken }
//         );

//         console.log("dataaa:", response);

//         const newAccessToken = response.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axios(originalRequest);
//       } catch (error) {
//         console.log("Errorrrrrrrrrrrrrrrrrr", error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
