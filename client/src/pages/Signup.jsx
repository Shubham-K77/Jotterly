import Navbar from "@/components/custom/Navbar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
const Signup = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeToggler.theme);
  //Check If User Is LoggedIn:
  useEffect(() => {
    const retrieveUserInfo = async () => {
      let response = await axios.get(
        "https://jotterly-api.vercel.app/api/v1/users/userInfo",
        { withCredentials: true }
      );
      if (response) {
        enqueueSnackbar("The user is already logged in.", { variant: "info" });
        return navigate("/main");
      }
    };
    retrieveUserInfo();
  }, [enqueueSnackbar, navigate]);
  //Create New User:
  const createUser = async () => {
    try {
      setLoading(true);
      if (name.length < 10) {
        setError(true);
        setErrorMessage("Name must be at least 10 characters long!");
        setLoading(false);
        return enqueueSnackbar("Name must be at least 10 characters long!", {
          variant: "error",
        });
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setError(true);
        setErrorMessage("Please enter a valid email address!");
        setLoading(false);
        return enqueueSnackbar("Please enter a valid email address!", {
          variant: "error",
        });
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(true);
        setErrorMessage(
          "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number & 1 special character!"
        );
        setLoading(false);
        return enqueueSnackbar(
          "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number & 1 special character!",
          {
            variant: "error",
          }
        );
      }
      if (password !== confirmPassword) {
        setError(true);
        setErrorMessage("Passwords didn't match!");
        setLoading(false);
        return enqueueSnackbar("Passwords didn't match!", {
          variant: "error",
        });
      }
      const response = await axios.post(
        "https://jotterly-api.vercel.app/api/v1/users/register",
        {
          name,
          email,
          password,
        }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      setErrorMessage("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      navigate("/verify");
    } catch (error) {
      setLoading(false);
      let message = error?.response.data.message || "Internal Server Error!";
      setError(true);
      setErrorMessage(message);
      enqueueSnackbar(message, { variant: "error" });
    }
  };
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
        <div
          className={`w-[95%] lg:w-[25%] rounded-md border-2 border-slate-300 shadow-sm flex flex-col justify-start items-start ${
            error === true ? "h-[72vh]" : "h-[70vh]"
          }`}
        >
          <div className="mt-6 mb-4 ml-6 text-[1.75rem] font-semibold">
            Register
          </div>
          <div className="w-full mb-4 ml-6">
            <input
              className="w-[85%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-4 ml-6">
            <input
              className="w-[85%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-4 ml-6 flex jusifty-center items-center">
            <input
              className="w-[70%] h-[7.5vh] text-[1.10rem] font-semibold rounded-sm p-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 mr-2"
              type={showPassword === false ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
            <div className="ml-6 text-[0.85rem] font-semibold text-red-800 mb-2 w-[85%] flex justify-center items-center">
              {errorMessage}
            </div>
          )}
          <div
            className={`w-[85%] ml-6 h-[7.5vh] rounded-md mb-2 text-white text-[1.25rem] font-semibold shadow-md flex justify-center items-center hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 ${
              theme === "light"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-teal-400 hover:bg-teal-500"
            }`}
            onClick={() => {
              createUser();
            }}
          >
            {loading === true ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              "Register"
            )}
          </div>
          <div className="w-[85%] ml-6 flex justify-center items-center mb-1">
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
          <div className="w-[85%] ml-6 flex justify-center items-center">
            <div className="text-[1.05rem] font-semibold mr-2">
              Want to verify your account?
            </div>
            <div
              className={`text-[1.05rem] font-semibold underline hover:cursor-pointer ${
                theme === "light" ? "text-green-600" : "text-teal-400"
              }`}
              onClick={() => navigate("/verify")}
            >
              Veirfy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
