import { useNavigate } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { LuMoonStar } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { themeToggler } from "../../../slices/themeSlice/theme";
const Navbar = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeToggler.theme);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[50vh] lg:h-[30vh] flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center bg-transparent">
      <div
        className="w-[80%] lg:w-[20%] h-[20vh] mt-2 mb-2 lg:mt-0 lg:mb-0 bg-transparent hover:cursor-pointer"
        onClick={() => navigate("/")}
        style={{
          backgroundImage: `url(${
            theme === "light" ? "/Images/logo.png" : "/Images/darkLogo.png"
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="lg:w-[8%] w-[34%] h-[6vh] bg-transparent rounded-3xl mb-2 lg:mb-0 flex justify-around items-start hover:cursor-pointer transition-all ease-in-out duration-200 border-2 border-slate-200"
        onClick={() => dispatch(themeToggler())}
      >
        <div
          className={`flex justify-center items-center w-[50%] h-[5.5vh] rounded-l-3xl pb-0.5 ${
            theme === "light"
              ? "bg-amber-400"
              : "hover:bg-amber-400 hover:text-black"
          }`}
        >
          <FiSun className="text-[1.5rem] font-semibold" />
        </div>
        <div
          className={`flex justify-center items-center w-[50%] h-[5.5vh] pb-0.5 rounded-r-3xl ${
            theme === "dark"
              ? "bg-slate-700 text-white"
              : "hover:bg-gray-700 hover:text-white"
          }`}
        >
          <LuMoonStar className="text-[1.5rem] font-semibold" />
        </div>
      </div>
      <div className="w-[80%] lg:w-[20%] h-[20vh] bg-transparent flex justify-evenly items-center">
        <div
          className={`w-[45%] shadow-md h-[8vh] rounded-md text-white text-[1.25rem] font-semibold flex justify-center items-center hover:cursor-pointer transition-all ease-in-out duration-200 hover:scale-110 lg:mr-2 ${
            theme === "light"
              ? "bg-sky-400 hover:bg-sky-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </div>
        <div
          className={`w-[45%] shadow-md h-[8vh] rounded-md text-white text-[1.25rem] font-semibold flex justify-center items-center hover:cursor-pointer transition-all ease-in-out duration-200 hover:scale-110 ${
            theme === "light"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-teal-400 hover:bg-teal-500"
          }`}
          onClick={() => navigate("/signup")}
        >
          Signup
        </div>
      </div>
    </div>
  );
};

export default Navbar;
