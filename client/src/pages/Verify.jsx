import Navbar from "@/components/custom/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const Verify = () => {
  const [currentPhase, setCurrentPhase] = useState(false);
  const [error, setError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state) => state.themeToggler.theme);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();
  //To send email!
  const sendMail = async () => {
    setLoading(true);
    try {
      if (name.length < 10) {
        setLoading(false);
        setError(true);
        setErrorMessage("Name must be at least 10 characters long!");
        return enqueueSnackbar("Name must be at least 10 characters long!", {
          variant: "error",
        });
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setLoading(false);
        setError(true);
        setErrorMessage("Please enter a valid email address!");
        return enqueueSnackbar("Please enter a valid email address!", {
          variant: "error",
        });
      }
      const response = await axios.post(
        "http://localhost:5555/api/v1/users/sendMail",
        { name, email }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      setError(false);
      setLoading(false);
      setCurrentPhase(true);
    } catch (error) {
      let message = error?.response?.data.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setError(true);
      setErrorMessage(message);
      setLoading(false);
    }
  };
  const handleOtpChange = (value) => {
    setOtpValue(value);
  };
  //Verify The Otp!
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5555/api/v1/users/validate",
        { name, email, otpValue }
      );
      let verify = response?.data?.verify;
      if (verify === "email") {
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        setLoading(false);
        navigate("/login");
      } else {
        let resetCode = response?.data?.resetCode;
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        setLoading(false);
        navigate(`reset/${resetCode}`);
      }
    } catch (error) {
      let message = error?.response?.data.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setOtpErrorMessage(message);
      setOtpError(true);
      setLoading(false);
    }
  };
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="ml-6 w-full mb-4">
            <input
              className="w-[85%] h-[7.5vh] p-2 text-[1.05rem] font-semibold rounded-md border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            onClick={() => sendMail()}
          >
            {loading === false ? (
              "Send OTP"
            ) : (
              <ImSpinner8 className="animate-spin" />
            )}
          </div>
          {currentPhase && (
            <>
              <div className="ml-6 text-[1rem] font-semibold mb-4 flex justify-center items-center w-[85%]">
                Please enter the OTP sent to your email.
              </div>
              <div className="ml-6 w-[85%] flex justify-center items-center mb-4">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={handleOtpChange}
                >
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
              {otpError && (
                <div className="text-[0.85rem] font-semibold mb-2 text-red-700 w-full flex justify-center items-center">
                  {otpErrorMessage}
                </div>
              )}
              <div
                className={`w-[85%] ml-6 h-[7.5vh] mb-4 text-white text-[1.10rem] font-semibold flex justify-center items-center rounded-md hover:cursor-pointer transition-transform ease-in-out duration-200 hover:scale-105 ${
                  theme === "light"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-teal-400 hover:bg-teal-500"
                }`}
                onClick={() => verifyOtp()}
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
