import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../services/productApi";
import Cookies from "js-cookie";

export default function PageNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState("");

  const { customer } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setValues(() => e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(values.trim(), navigate));
    setValues("");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("customer");
    Cookies.set("accessToken", "", {
      sameSite: "none",
      expires: 0,
      secure: true,
    });
    Cookies.set("refreshToken", "", {
      sameSite: "none",
      expires: 0,
      secure: true,
    });
    navigate("/");
  };

  return (
    <nav className="flex justify-between font-Poppins gap-10 py-3 px-14 bg-pearl w-full">
      <Logo />
      <form className="flex gap-3 relative">
        <input
          type="text"
          name="search"
          value={values}
          onChange={handleChange}
          placeholder="Search"
          className="placeholder:text-gray block bg-white w-[500px] h-10 border border-gray rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
        />
        <MdOutlineSearch
          onClick={handleSearch}
          className=" absolute right-0 self-center w-20 h-10 bg-color cursor-pointer p-2 rounded-r-md text-white"
        />
      </form>

      <div className="flex gap-6 self-center">
        <div className="flex gap-6 self-center items-center justify-center">
          {customer !== null ? (
            <>
              <div className="bg-color rounded-full text-white font-semibold w-8 h-8 flex justify-center items-center self-center">
                <p>{customer.firstName[0].toUpperCase()}</p>
              </div>
              <NavLink to="/cart" className="relative">
                <FaShoppingCart className="w-7 h-7 text-white cursor-pointer hover:text-color transition ease-in duration-300" />
              </NavLink>
              <button
                type="submit"
                onClick={handleLogout}
                className=" text-white w-16 py-2 rounded-lg text-md font-semibold hover:text-color transition ease-in duration-100 uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <div className=" space-x-4">
              <NavLink to="/signup">
                <button className=" text-white w-16 py-2 rounded-lg text-md font-semibold hover:text-color transition ease-in duration-100 uppercase">
                  Signup
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className=" text-white w-16 py-2 rounded-lg text-md font-semibold hover:text-color transition ease-in duration-100 uppercase">
                  Login
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
