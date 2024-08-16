import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";
import { setCart, setCartItems, setLoading } from "../Feature/Slices/cartSlice";

export function getCartItem() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/api/v1/cart`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setCart(response.data.data));
      dispatch(setCartItems(response.data.data.cartItem));
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}

export function addItemToCart(cartData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.put(`/api/v1/cart/add`, cartData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
      toast.success("Product added to cart", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.message, {
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

export function removeCartItem(cartItemId) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/cart_items/${cartItemId}`,
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
      toast.success("Cart item removed", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Something went wrong while removing the item", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
  };
}

export function updateCartItem(cartData) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/cart_items/${cartData.cartItemId}`,
        cartData,
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
    } catch (error) {
      toast.error("Something went wrong while updating the item", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}
