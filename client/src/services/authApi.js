import axios from "axios";
import { BASE_URI_API } from "../axios/axiosInstance";
import {
  setLoading,
  setCustomer,
  setAccessToken,
} from "../Feature/Slices/authSlice";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function registerCustomer(customerData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URI_API}/api/v1/customer/register`,
        customerData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successfull", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function loginCustomer(loginDetails, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URI_API}/api/v1/customer/login`,
        loginDetails
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      dispatch(setAccessToken(response.data.accessToken));
      dispatch(setCustomer(response.data.customer));

      Cookies.set("accessToken", response.data.accessToken, {
        sameSite: "none",
        expires: 2,
        secure: true,
      });

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      localStorage.setItem("customer", JSON.stringify(response.data.customer));

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getCustomerDetails(accessToken, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URI_API}/api/v1/customer/details`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setAccessToken(accessToken));
      dispatch(setCustomer(response.data.data));

      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("customer", JSON.stringify(response.data.data));

      navigate("/");
    } catch (error) {
      // toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
