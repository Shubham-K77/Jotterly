import Navbar from "@/components/custom/Navbar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
const Reset = () => {
  const theme = useSelector((state) => state.themeToggler.theme);
  const navigate = useNavigate();
  const resetCode = useParams().id;
  const [seePassword, setSeePassword] = useState(false);
  const [seeResetPassword, setSeeResetPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  //Handle Reset Password:
  const handleReset = async () => {
    try {
      setLoading(true);
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setLoading(false);
        setError(true);
        setErrorMessage(
          "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number & 1 special character!"
        );
        return enqueueSnackbar(
          "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number & 1 special character!",
          { variant: "error" }
        );
      }
      if (password !== resetPassword) {
        setLoading(false);
        setError(true);
        setErrorMessage("Password Didn't Match!");
        return enqueueSnackbar("Password Didn't Match!", { variant: "error" });
      }
      const response = await axios.put(
        `https://jotterly-api.vercel.app/api/v1/users/reset/${resetCode}`,
        { password }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      setLoading(false);
      setError(false);
      navigate("/login");
    } catch (error) {
      let message = error?.response?.data.message;
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
      setError(true);
      setErrorMessage(message);
    }
  };
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center transition-colors ease-in-out duration-150 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Navbar />
      <div className="w-full h-[75vh] bg-transparent flex flex-col justify-center items-center">
        <div className="w-[95%] lg:w-[26%] h-[58vh] border-2 border-slate-300 rounded-md shadow-sm flex-col justify-start items-start">
          <div className="text-[2rem] font-semibold mt-4 mb-6 ml-6">Reset</div>
          <div className="mt-4 mb-6 ml-6 flex justify-start items-center">
            <input
              type={seePassword === false ? "password" : "text"}
              className="p-2 text-[1.25rem] font-semibold w-[75%] h-[8.5vh] rounded-md mr-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className={`w-[12%] h-[7vh] rounded-md flex justify-center items-center text-white text-[1.75rem] shadow-sm transition-all ease-in-out duration-150 hover:scale-110 hover:cursor-pointer ${
                theme === "light"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-rose-400 hover:bg-rose-500"
              }`}
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword === false ? <IoEye /> : <IoEyeOff />}
            </div>
          </div>
          <div className="mt-4 mb-6 ml-6 flex justify-start items-center">
            <input
              type={seeResetPassword === false ? "password" : "text"}
              className="p-2 text-[1.25rem] font-semibold w-[75%] h-[8.5vh] rounded-md mr-2 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              placeholder="Confirm New Password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              required
            />
            <div
              className={`w-[12%] h-[7vh] rounded-md flex justify-center items-center text-white text-[1.75rem] shadow-sm transition-all ease-in-out duration-150 hover:scale-110 hover:cursor-pointer ${
                theme === "light"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-rose-400 hover:bg-rose-500"
              }`}
              onClick={() => setSeeResetPassword(!seeResetPassword)}
            >
              {seeResetPassword === false ? <IoEye /> : <IoEyeOff />}
            </div>
          </div>
          {error && (
            <div className="mt-2 mb-4 ml-6 text-[0.95rem] font-semibold text-red-600">
              {errorMessage}
            </div>
          )}
          <div
            className={`ml-6 mt-2 mb-2 rounded-sm text-white flex justify-center items-center font-semibold text-[1.25rem] w-[85%] h-[8.5vh] shadow-sm hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-95 ${
              theme === "light"
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
            onClick={() => handleReset()}
          >
            {loading === false ? (
              "Reset Password"
            ) : (
              <ImSpinner8 className="animate-spin" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
