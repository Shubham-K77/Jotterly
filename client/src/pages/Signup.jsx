/* eslint-disable no-unused-vars */
import Navbar from "@/components/custom/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden overflow-y-hidden ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Navbar />
      <div className="w-full h-[75vh] bg-transparent flex justify-center items-center">
        <div className="w-[95%] lg:w-[25%] h-[70vh] rounded-md border-2 border-slate-300 shadow-sm flex flex-col justify-start items-start">
          <div className="mt-6 mb-4 ml-6 text-[1.75rem] font-semibold">
            Register
          </div>
          <div className="w-full mb-4 ml-6">
            <input
              className="w-[85%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400"
              placeholder="Name"
            />
          </div>
          <div className="w-full mb-4 ml-6">
            <input
              className="w-[85%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="w-full mb-4 ml-6 flex jusifty-center items-center">
            <input
              className="w-[70%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 mr-2"
              type={showPassword === false ? "password" : "text"}
              placeholder="Password"
            />
            <div
              className={`w-[12%] h-[6vh] rounded-sm hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-95 flex justify-center items-center text-white ${
                theme === "light"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-teal-400 hover:bg-teal-500"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword === true ? (
                <IoEyeOff className="text-[2rem] font-semibold" />
              ) : (
                <IoEye className="text-[2rem] font-semibold" />
              )}
            </div>
          </div>
          <div className="w-full mb-4 ml-6 flex jusifty-center items-center">
            <input
              className="w-[70%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 mr-2"
              type={showConfirmPassword === false ? "password" : "text"}
              placeholder="Confirm Password"
            />
            <div
              className={`w-[12%] h-[6vh] rounded-sm hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-95 text-white flex justify-center items-center ${
                theme === "light"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-teal-400 hover:bg-teal-500"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword === true ? (
                <IoEyeOff className="text-[2rem] font-semibold" />
              ) : (
                <IoEye className="text-[2rem] font-semibold" />
              )}
            </div>
          </div>
          {error && (
            <div className="ml-6 text-[0.85rem] font-semibold text-red-800 mb-2">
              Please enter valid email address.
            </div>
          )}
          <div
            className={`w-[85%] ml-6 h-[7.5vh] rounded-md mb-2 text-white text-[1.25rem] font-semibold shadow-md flex justify-center items-center hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 ${
              theme === "light"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-teal-400 hover:bg-teal-500"
            }`}
          >
            Register
          </div>
          <div className="w-[85%] ml-6 flex justify-center items-center mb-2">
            <div className="text-[1.05rem] font-semibold mr-2">
              Already have an account?
            </div>
            <div
              className={`text-[1.05rem] font-semibold underline hover:cursor-pointer ${
                theme === "light" ? "text-green-600" : "text-teal-400"
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
