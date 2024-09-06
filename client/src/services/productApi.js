import { toast } from "react-hot-toast";
import {
  setProducts,
  setProduct,
  setLoading,
} from "../Feature/Slices/productSlice";
import axios from "axios"

export function findProductById(productData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { productId } = productData;
    try {
      const response = await axios.get(`https://himanshu-dhapola-easby.vercel.app/api/v1/products/${productId}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProduct(response.data.data));
    } catch (error) {
      // toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function searchProducts(searchProduct,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://himanshu-dhapola-easby.vercel.app/api/v1/products/search/${searchProduct}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setProducts(response.data.products));
      navigate(`/products/search/${searchProduct}`);
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

export function categorySearch(category, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://himanshu-dhapola-easby.vercel.app/api/v1/products/category/${category}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProducts(response.data.products));
      navigate(`/products/category/${category}`);
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


