import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const theme = useSelector((state) => state.themeToggler.theme);
  const navigate = useNavigate();
  return (
    <div
      className={`w-[16%] lg:w-[4%] h-[7.25vh] rounded-sm shadow-sm fixed bottom-3 right-4 flex justify-center items-center hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-110 ${
        theme === "light"
          ? "bg-sky-700 hover:bg-sky-600"
          : "bg-rose-400 hover:bg-rose-300"
      }`}
      onClick={() => navigate("/main")}
    >
      <IoMdArrowRoundBack className="text-[1.85rem] text-white font-semibold" />
    </div>
  );
};

export default BackButton;
