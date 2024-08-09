import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerCustomer } from "../../../services/authApi";

export default function Signup() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerCustomer(customerDetails, navigate));
    setCustomerDetails({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-smoke font-Poppins">
      <div className="w-[500px] h-[450px] rounded-lg shadow-2xl bg-white flex flex-col justify-start items-center">
        <h2 className="font-semibold text-3xl text-color p-8 mt-5">
          Signup as a New Customer
        </h2>
        <form className="flex flex-col justify-center items-center space-y-4">
          <div className="flex flex-row gap-[10px]">
            <input
              type="text"
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleChange}
              autoComplete="name"
              required
              placeholder="First Name*"
              className="placeholder:text-slate-400 block bg-white w-[170px] h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
            <input
              type="text"
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleChange}
              autoComplete="name"
              required
              placeholder="Last Name*"
              className="placeholder:text-slate-400 block bg-white w-[170px] h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
          </div>
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="Email*"
            className="placeholder:text-slate-400 block bg-white w-[350px] h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
          <div className="relative">
            <input
              type={eye ? "text" : "password"}
              name="password"
              value={customerDetails.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Password*"
              className="placeholder:text-slate-400 block bg-white w-[350px] h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
            {eye ? (
              <FaEye
                onClick={() => setEye(false)}
                className="absolute right-4 bottom-3 text-lg hover:text-color cursor-pointer transition-all duration-300 ease-out"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setEye(true)}
                className="absolute right-4 bottom-3 text-lg hover:text-color cursor-pointer transition-all duration-300 ease-out"
              />
            )}
          </div>
        </form>
        <button
          onClick={handleRegister}
          className="bg-color text-white w-[350px] px-8 py-3 mt-8 rounded-lg text-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          Signup
        </button>
        <div className="flex justify-center gap-5 w-full mt-5 font-Poppins ">
          <p className=" font-semibold">if you already have account?</p>
          <NavLink to="/login">
            <button className="text-color font-bold uppercase">Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
