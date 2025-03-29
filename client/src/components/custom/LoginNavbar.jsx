/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { LuMoonStar } from "react-icons/lu";
import { themeToggler } from "../../../slices/themeSlice/theme";
import { useSnackbar } from "notistack";
import { loggedInUser } from "../../../slices/userSlice/User";
import { useNavigate } from "react-router-dom";
//Dialog Component Shad-CN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImSpinner8 } from "react-icons/im";
const LoginNavbar = ({ searchTag, searchLoading }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeToggler.theme);
  const userData = useSelector((state) => state.userState.userData);
  const userLoggedIn = useSelector((state) => state.userState.userLoggedIn);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const timeoutRef = useRef(null);
  let nameInitials = "";
  if (userLoggedIn && userData?.name) {
    const nameParts = userData.name.split(" ");
    nameInitials = nameParts[0][0] || "";
    if (nameParts.length > 1) {
      nameInitials += nameParts[1][0];
    }
  }
  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          "http://localhost:5555/api/v1/users/userInfo",
          { withCredentials: true }
        );
        dispatch(loggedInUser(response.data.userExists));
        setLoading(false);
      } catch (error) {
        let message = error?.response?.data.message || "Must Login To Access!";
        enqueueSnackbar(message, { variant: "error" });
        setLoading(false);
        navigate("/login");
      }
    };
    retrieveUserInfo();
  }, [dispatch, enqueueSnackbar, navigate]);
  //Handle Logout:
  const handleLogout = async () => {
    try {
      setLoading(true);
      let response = await axios.post(
        "http://localhost:5555/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      setLoading(false);
      dispatch(loggedInUser(null));
      navigate("/");
    } catch (error) {
      let message = error?.response?.data.message || "Internal Error";
      setLoading(false);
      enqueueSnackbar(message, { variant: "error" });
    }
  };
  //Handle Search:
  const handleSearch = async (text) => {
    setSearchText(text);
    //If Previous Timeout Exists! Clear it!
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    //A New TimeoutId!
    timeoutRef.current = setTimeout(() => {
      searchTag(text);
    }, 2000);
  };
  return (
    <div className="w-full h-[39.5vh] lg:h-[15vh] flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center">
      <div
        className="w-[55%] h-[14vh] mt-2 mb-2 lg:mt-0 lg:mb-0 lg:w-[15%] lg:h-[12vh] bg-transparent hover:cursor-pointer"
        title="Home Page"
        style={{
          backgroundImage: `url(${
            theme === "light" ? "/Images/logo.png" : "/Images/darkLogo.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="w-[85%] mb-2 lg:mb-0 lg:w-[30%] h-[12vh] bg-transparent flex justify-center items-center">
        <input
          className="w-[80%] h-[8vh] rounded-md text-[1rem] font-semibold border-[0.5px] border-slate-300 p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
          placeholder="Search Your Notes By Tags"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div
          className={`w-[15%] lg:w-[10%] h-[7vh] rounded-sm flex justify-center items-center transition-all ease-in-out duration-150 hover:scale-105 hover:cursor-pointer shadow-sm ${
            theme === "light"
              ? "bg-sky-700 hover:bg-sky-600"
              : "bg-rose-400 hover:bg-rose-500"
          }`}
          onClick={() => handleSearch(searchText)}
        >
          {searchLoading === true ? (
            <ImSpinner8 className="text-white font-semibold text-[1.75rem] animate-spin" />
          ) : (
            <IoIosSearch className="text-white font-semibold text-[1.75rem]" />
          )}
        </div>
      </div>
      <div className="w-[85%] mb-4 lg:mb-0 lg:w-[20%] h-[12vh] bg-transparent flex justify-evenly items-center">
        {/* Dialog Component */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className={`w-[22%] h-[10vh] lg:w-[20.5%] lg:h-[8.5vh] bg-slate-200 rounded-[50%] hover:cursor-pointer shadow-sm transition-all ease-in-out duration-150 hover:scale-110 flex justify-center items-center text-[1.75rem] font-semibold ${
                loading === true ? "animate-pulse" : ""
              } ${
                theme === "light"
                  ? "text-sky-700"
                  : "text-rose-400 bg-amber-500"
              }`}
              title="Account Info"
            >
              {nameInitials || "AA"}
            </div>
          </DialogTrigger>
          <DialogContent
            className={`${
              theme === "light"
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-900 text-gray-100"
            }`}
          >
            <DialogHeader>
              <DialogTitle>{userLoggedIn && userData.name}</DialogTitle>
              <DialogDescription>
                This modal displays the details you provided during
                registration.
              </DialogDescription>
            </DialogHeader>
            {/* Your Own Div */}
            <div className="w-full justify-evenly items-center">
              <div className="text-[1.05rem]">Name:</div>
              <div className="text-[1.05rem]">{userData?.name}</div>
            </div>
            <div className="w-full justify-center items-center">
              <div className="mr-2 text-[1.05rem]">Email Address:</div>
              <div className="text-[1.05rem]">{userData?.email}</div>
            </div>
            <div className="w-full justify-center items-center">
              <div className="text-[1.05rem]">Email Validation:</div>
              <div className="text-[1.05rem]">
                {userData?.emailValidate === true
                  ? "✔️ Verified"
                  : "❌ Unverified"}
              </div>
            </div>
            <DialogFooter>
              <div
                className={`w-[40%] h-[8vh] text-white rounded-md shadow-sm flex justify-center items-center text-[1.10rem] font-semibold hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-105 ${
                  theme === "light"
                    ? "bg-sky-700 hover:bg-sky-600"
                    : "bg-rose-400 hover:bg-rose-500"
                }`}
                onClick={() => handleLogout()}
              >
                {loading === false ? (
                  "Logout"
                ) : (
                  <ImSpinner8 className="animate-spin" />
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div
          className="w-[35%] h-[5.5vh] bg-transparent rounded-lg hover:cursor-pointer flex justify-around items-center transition-all ease-in-out duration-150 hover:scale-110 drop-shadow-sm"
          title="Change Theme"
          onClick={() => dispatch(themeToggler())}
        >
          <div
            className={`w-[50%] h-[5.5vh] flex justify-center items-center rounded-l-lg ${
              theme === "light"
                ? "bg-amber-400 text-black"
                : "bg-transparent text-white hover:bg-amber-300 hover:text-black"
            }`}
          >
            <FiSun className="font-bold text-[1.35rem]" />
          </div>
          <div
            className={`w-[50%] h-[5.5vh] flex justify-center items-center rounded-r-lg ${
              theme === "light"
                ? "bg-transparent text-black hover:bg-gray-900 hover:text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            <LuMoonStar className="font-bold text-[1.35rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginNavbar;
