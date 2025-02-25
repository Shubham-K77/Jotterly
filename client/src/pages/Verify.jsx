/* eslint-disable no-unused-vars */
import Navbar from "@/components/custom/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const Verify = () => {
  const [currentPhase, setCurrentPhase] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Email doesn't exist in the system"
  );
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Navbar />
      <div className="w-full h-[75vh] bg-transparent flex justify-center items-center">
        <div
          className={`w-[95%] lg:w-[25%] border-2 border-slate-300 shadow-sm rounded-md flex flex-col justify-start items-start ${
            currentPhase === false ? "h-[50vh]" : "h-[70vh]"
          }`}
        >
          <div className="ml-6 mt-6 mb-4 text-[1.75rem] font-semibold">
            Authenticate
          </div>
          <div className="ml-6 w-full mb-4">
            <input
              className="w-[85%] h-[7.5vh] p-2 text-[1.05rem] font-semibold rounded-md border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Name"
            />
          </div>
          <div className="ml-6 w-full mb-4">
            <input
              className="w-[85%] h-[7.5vh] p-2 text-[1.05rem] font-semibold rounded-md border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
          </div>
          {error && (
            <div className="text-[0.85rem] font-semibold mb-2 text-red-700 ml-6">
              {errorMessage}
            </div>
          )}
          <div
            className={`w-[85%] ml-6 h-[7.5vh] mb-4 text-white text-[1.10rem] font-semibold flex justify-center items-center rounded-md hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 ${
              theme === "light"
                ? "bg-sky-400 hover:bg-sky-500"
                : "bg-indigo-700 hover:bg-indigo-800"
            }`}
          >
            Send OTP
          </div>
          {currentPhase && (
            <>
              <div className="ml-6 text-[1rem] font-semibold mb-4 flex justify-center items-center w-[85%]">
                Please enter the OTP sent to your email.
              </div>
              <div className="ml-6 w-[85%] flex justify-center items-center mb-4">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-[7.5vh] shadow-sm" />
                    <InputOTPSlot index={1} className="h-[7.5vh] shadow-sm" />
                    <InputOTPSlot index={2} className="h-[7.5vh] shadow-sm" />
                    <InputOTPSlot index={3} className="h-[7.5vh] shadow-sm" />
                    <InputOTPSlot index={4} className="h-[7.5vh] shadow-sm" />
                    <InputOTPSlot index={5} className="h-[7.5vh] shadow-sm" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && (
                <div className="text-[0.85rem] font-semibold mb-2 text-red-700 w-full flex justify-center items-center">
                  {errorMessage}
                </div>
              )}
              <div
                className={`w-[85%] ml-6 h-[7.5vh] mb-4 text-white text-[1.10rem] font-semibold flex justify-center items-center rounded-md hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 ${
                  theme === "light"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-teal-400 hover:bg-teal-500"
                }`}
              >
                Verify Account
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Verify;
