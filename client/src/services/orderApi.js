import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";
import {  setOrder, setLoading } from "../Feature/Slices/orderSlice";

export function createOrder({ customerAddress, navigate }) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        `/api/v1/order`,
        customerAddress,
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      if (response.data.data._id) {
        navigate({ search: `step=3&order_id=${response.data.data._id}` });
      }
      dispatch(setOrder(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function getAllOrders() {
  const toastId = toast.loading("Loading...");
  let result = {};
  try {
    const response = await axiosInstance.get(`/api/v1/order/`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
    toast.success("fetched all orders", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (error) {
    toast.error(error.response.data.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  toast.dismiss(toastId);
  return result;
}

export function getOrderById(orderId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/api/v1/order/${orderId}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      dispatch(setOrder(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
