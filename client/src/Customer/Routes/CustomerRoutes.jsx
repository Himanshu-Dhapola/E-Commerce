import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Product from "../Components/Product/Product";
import Cart from "../Components/Cart/Cart";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Checkout from "../Components/Checkout/Checkout";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import Success from "../Components/Payment/Success";
import Failed from "../Components/Payment/Failed";

export default function CustomerRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products/search/:keyword" element={<Product />}></Route>
        <Route path="/products/category/:keyword" element={<Product />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/failed" element={<Failed />}></Route>
      </Routes>
    </div>
  );
}
