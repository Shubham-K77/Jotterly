/* eslint-disable react/prop-types */
import { GoPin } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { useSelector } from "react-redux";
//Dialog Component Shad-CN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImSpinner8 } from "react-icons/im";
const NotesDisplay = ({ data, pinNote, loading }) => {
  let date = new Date(data.createdAt).toLocaleString();
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div className="flex flex-col justify-start items-start transition-transform ease-in-out duration-150 hover:scale-105 hover:cursor-pointer shadow-sm w-[95%] h-[45vh] lg:w-[30%] lg:h-[33vh] rounded-md mb-8 border-1 border-gray-300">
      {/* Title Name And Pin */}
      <div className="w-full flex justify-around items-center mb-2 p-2 mt-2">
        <div className="ml-2 text-[1.10rem] font-semibold">{data.title}</div>
        {data.isPinned === true ? (
          <div
            className="flex justify-center items-center ml-2 transition-transform ease-in-out duration-150 hover:scale-115 hover:cursor-pointer"
            title="Unpin"
            onClick={() => pinNote(data.userId, data._id)}
          >
            <GoPin className="text-[1.75rem] font-bold text-red-600" />
          </div>
        ) : (
          <div
            className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[10%] lg:h-[6vh] text-white rounded-sm hover:cursor-pointer ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-500"
            }`}
            onClick={() => pinNote(data.userId, data._id)}
          >
            {loading === true ? (
              <ImSpinner8 className="text-[1.5rem] font-semibold animate-spin" />
            ) : (
              <GoPin className="text-[1.5rem] font-semibold" />
            )}
          </div>
        )}
      </div>
      {/* Created Date */}
      <div className="ml-4 mb-2 text-gray-400 font-semibold text-[0.90rem]">
        {date}
      </div>
      {/* Description */}
      <div className="ml-4 mb-2 text-[1rem] font-semibold">
        {data.content.substring(0, 52) + " ..."}
      </div>
      {/* Category */}
      <div
        className={`ml-4 mb-2 flex justify-center items-center rounded-sm w-[28%] h-[6.5vh] lg:w-[20%] shadow-sm ${
          theme === "light" ? "bg-sky-700" : "bg-rose-400"
        }`}
      >
        <div className="text-[1.05rem] text-white font-semibold">IdeaBox</div>
      </div>
      {/* Tags and Icons */}
      <div className="ml-4 w-full mb-2 flex flex-col justify-start items-start lg:flex-row lg:justify-around lg:items-center">
        <div className="flex justify-start items-center">
          {data.tags.map((tag) => (
            <div
              className="text-[0.95rem] font-semibold text-gray-400 mb-4 mr-1 lg:mb-0"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="w-full lg:w-[70%] flex justify-center items-center mb-2 lg:mb-0">
          {/* View Button */}
          <Dialog>
            <DialogTrigger asChild>
              <div
                className={`flex justify-center items-center transition-transform ease-in-out duration-150 hover:scale-120 w-[15%] h-[6.5vh] lg:w-[14%] lg:h-[5vh] text-white rounded-sm mr-4 lg:mr-2 ${
                  theme === "light"
                    ? "bg-sky-700 hover:bg-sky-600"
                    : "bg-rose-400 hover:bg-rose-500"
                }`}
              >
                <MdRemoveRedEye className="text-[1.35rem] font-semibold" />
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
                {/* Notes Title Name */}
                <DialogTitle className="w-full flex justify-center items-center font-semibold text-[1.25rem] mb-2">
                  Visit The Doctor Today!
                </DialogTitle>
                {/* Description of the note */}
                <DialogDescription className="text-[0.95rem] font-semibold">
                  Booked an appointment in Frontline Hospital for hand fracture
                  that I suffered in 10th March 2025
                </DialogDescription>
              </DialogHeader>
              {/* For AI Suggestions! */}
              <div className="mt-2 mb-2 w-full flex flex-col justify-start items-center">
                <div className="mb-2 text-[1.20rem] font-semibold">
                  AI Recommendation
                </div>
                <div className="w-full p-2 border-1 border-gray-300 shadow-sm mt-2 mb-2 rounded-sm">
                  <ul className="list-disc pl-4 text-justify mt-2 mb-2 text-[0.90rem] font-semibold">
                    <li className="mb-2 mt-1">
                      Leave early to avoid traffic and ensure timely arrival at
                      Frontline Hospital. Prepare necessary documents (ID,
                      medical reports) and wear comfortable clothing for easy
                      examination.
                    </li>
                    <li className="mb-2">
                      Apply a cold pack to the affected area before leaving if
                      experiencing pain. Carry pain relief medication if
                      prescribed. Stay hydrated and relaxed to minimize
                      discomfort during the visit.
                    </li>
                    <li className="mb-2">
                      After the appointment, follow the doctor’s advice
                      diligently. Apply recommended ointments, take prescribed
                      medications on time, and avoid strenuous activities to
                      promote faster recovery.
                    </li>
                  </ul>
                </div>
                <DialogDescription className="text-[0.95rem] font-semibold">
                  Booked an appointment in Frontline Hospital for hand fracture
                  that I suffered in 10th March 2025
                </DialogDescription>
              </div>
              {/* For Tags */}
              <div className="mt-2 mb-2 w-full flex justify-start items-center">
                <div
                  className={`p-2 ${
                    theme === "light"
                      ? "bg-sky-700 text-white"
                      : "bg-rose-400 text-white"
                  } font-semibold text-[0.90rem] rounded-sm shadow-sm mr-2`}
                >
                  #appointment
                </div>
                <div
                  className={`p-2 ${
                    theme === "light"
                      ? "bg-sky-700 text-white"
                      : "bg-rose-400 text-white"
                  } font-semibold text-[0.90rem] rounded-sm shadow-sm mr-2`}
                >
                  #doctor
                </div>
                <div
                  className={`p-2 ${
                    theme === "light"
                      ? "bg-sky-700 text-white"
                      : "bg-rose-400 text-white"
                  } font-semibold text-[0.90rem] rounded-sm shadow-sm mr-2`}
                >
                  #health
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
