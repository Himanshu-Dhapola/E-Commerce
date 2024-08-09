import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";
import {
  setProducts,
  setProduct,
  setLoading,
} from "../Feature/Slices/productSlice";

export function findProducts(productData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    const {
      color,
      size,
      minPrice,
      maxPrice,
      minDiscount,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = productData;
    try {
      const response = await axiosInstance.get(
        `/api/v1/products?color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      toast.success("Found Desired Products", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      console.log("RES: ",response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setProducts(response.data.data.product));
    } catch (error) {
      toast.error("No products found", {
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

export function findProductById(productData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    const { productId } = productData;
    try {
      const response = await axiosInstance.get(
        `/api/v1/products/${productId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProduct(response.data.data));
    } catch (error) {
      // toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function searchProducts(searchProduct,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        `/api/v1/products/search/${searchProduct}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setProducts(response.data.products));
      navigate(`/products/search/${searchProduct}`);
    } catch (error) {
      toast.error("Cannot fetch the searched product", {
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
    console.log(category);
    try {
      const response = await axiosInstance.get(
        `/api/v1/products/category/${category}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProducts(response.data.products));
      navigate(`/products/category/${category}`);
    } catch (error) {
      toast.error("Cannot fetch the product category", {
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


