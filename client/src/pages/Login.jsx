/* eslint-disable no-unused-vars */
import Navbar from "../components/custom/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const theme = useSelector((state) => state.themeToggler.theme);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
        <div className="w-[95%] lg:w-[25%] h-[60vh] bg-transparent shadow-sm rounded-md border-1 border-slate-300 flex flex-col justify-start items-start">
          <div className="text-[1.75rem] font-semibold mt-8 mb-8 ml-8">
            Login
          </div>
          <div className="mb-6 ml-8 w-full">
            <input
              className="w-[85%] h-[7.5vh] rounded-sm text-[1.10rem] font-semibold pl-4 border-1 border-slate-400 focus:outline-none hover:ring-2 hover:ring-green-400"
              placeholder={"Email"}
            />
          </div>
          <div className="mb-5 ml-3.5 w-full flex justify-center items-center">
            <input
              className="w-[75%] h-[7.5vh] rounded-sm text-[1.10rem] font-semibold pl-4 mr-2 border-1 border-slate-400 focus:outline-none hover:ring-2 hover:ring-green-400"
              type={seePassword === false ? "password" : "text"}
              placeholder="Password"
            />
            <div
              className={`h-[6vh] w-[12%] mr-2 rounded-md shadow-sm cursor-pointer transition-transform ease-in-out duration-200 hover:scale-95 text-white flex justify-center items-center ${
                theme === "light"
                  ? "bg-sky-400 hover:bg-sky-500"
                  : "bg-indigo-700 hover:bg-indigo-800"
              }`}
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword === false ? (
                <IoEye className="text-[1.75rem]" />
              ) : (
                <IoEyeOff className="text-[1.75rem]" />
              )}
            </div>
          </div>
          {error && (
            <div className="mb-2 ml-8 text-[1rem] font-semibold text-red-700">
              Please enter a valid email address.
            </div>
          )}
          <div
            className={`w-[85%] ml-8 mb-4 h-[7.5vh] rounded-md text-white shadow-sm cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 text-[1.25rem] font-semibold flex justify-center items-center ${
              theme === "light"
                ? "bg-sky-400 hover:bg-sky-500"
                : "bg-indigo-700 hover:bg-indigo-800"
            }`}
          >
            Login
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="text-[1.05rem] font-semibold mr-2">
              Not registered yet?
            </div>
            <div
              className={`underline font-semibold text-[1.05rem] cursor-pointer ${
                theme === "light" ? "text-sky-400" : "text-indigo-600"
              }`}
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
