import { GoPin } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { useSelector } from "react-redux";
const NotesDisplay = () => {
  const date = new Date().toLocaleString();
  const description =
    "Booked an appointment in Frontline Hospital for hand fracture that I suffered in 10th March 2025";
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div className="flex flex-col justify-start items-start transition-transform ease-in-out duration-150 hover:scale-105 hover:cursor-pointer shadow-sm hover:backdrop-blur-sm w-[95%] h-[38vh] lg:w-[30%] lg:h-[30vh] rounded-md mb-6 border-1 border-gray-300">
      {/* Title Name And Pin */}
      <div className="w-full flex justify-around items-center mb-2 p-2 mt-2">
        <div className="ml-2 text-[1.10rem] font-semibold">
          Visit The Doctor Today!
        </div>
        <div
          className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[10%] lg:h-[6vh] text-white rounded-sm ${
            theme === "light"
              ? "bg-sky-700 hover:bg-sky-600"
              : "bg-rose-400 hover:bg-rose-500"
          }`}
        >
          <GoPin className="text-[1.5rem] font-semibold" />
        </div>
      </div>
      {/* Created Date */}
      <div className="ml-4 mb-2 text-gray-400 font-semibold text-[0.90rem]">
        {date}
      </div>
      {/* Description */}
      <div className="ml-4 mb-2 text-[1rem] font-semibold">
        {description.substring(0, 52) + " ..."}
      </div>
      {/* Tags and Icons */}
      <div className="ml-4 w-full mb-2 flex flex-col justify-start items-start lg:flex-row lg:justify-around lg:items-center">
        <div className="text-[0.95rem] font-semibold text-gray-400 mb-2 lg:mb-0">
          #appointment #doctor #health
        </div>
        <div className="w-full lg:w-[70%] flex justify-center items-center mb-2 lg:mb-0">
          <div
            className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[14%] lg:h-[5vh] text-white rounded-sm mr-4 lg:mr-2 ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
          >
            <MdRemoveRedEye className="text-[1.35rem] font-semibold" />
          </div>
          <div
            className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[14%] lg:h-[5vh] text-white rounded-sm mr-4 lg:mr-2 ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
          >
            <FiEdit2 className="text-[1.35rem] font-semibold" />
          </div>
          <div
            className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[14%] lg:h-[5vh] text-white rounded-sm mr-4 lg:mr-2 ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
          >
            <AiOutlineDelete className="text-[1.35rem] font-semibold" />
          </div>
          <div
            className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[14%] lg:h-[5vh] text-white rounded-sm mr-7 lg:mr-2 ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
          >
            <RiChatVoiceAiFill className="text-[1.35rem] font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesDisplay;
