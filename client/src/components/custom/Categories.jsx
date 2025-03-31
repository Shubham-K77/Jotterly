/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Categories = ({ categoryCount, category }) => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeToggler.theme);
  const navigator = (category) => {
    if (category === "IdeaBox") {
      return navigate("/ideabox");
    } else if (category === "StudyNest") {
      return navigate("/studynest");
    } else if (category === "ZenDen") {
      return navigate("/zenden");
    } else if (category === "WorkFlow") {
      return navigate("/workflow");
    } else if (category === "LifeCraft") {
      return navigate("/lifecraft");
    } else {
      return navigate("/main");
    }
  };
  return (
    <div className="w-[95%] mt-2 mb-2 flex flex-wrap justify-center lg:justify-start items-center">
      {/* Count Of All The Notes */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "All"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-teal-500 hover:bg-teal-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("All")}
      >
        All ({categoryCount.all})
      </div>
      {/* Count Of IdeaBox */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "IdeaBox"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("IdeaBox")}
      >
        IdeaBox💡 ({categoryCount.IdeaBox})
      </div>
      {/* Count Of LifeCraft */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "LifeCraft"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-orange-500 hover:bg-orange-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("LifeCraft")}
      >
        LifeCraft⛺ ({categoryCount.LifeCraft})
      </div>
      {/* Count Of StudyNest */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "StudyNest"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-blue-500 hover:bg-blue-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("StudyNest")}
      >
        StudyNest🧠 ({categoryCount.StudyNest})
      </div>
      {/* Count of ZenDen */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "ZenDen"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5 font-extrabold"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-green-500 hover:bg-green-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("ZenDen")}
      >
        ZenDen☮️ ({categoryCount.ZenDen})
      </div>
      {/* Count of WorkFlow */}
      <div
        className={`w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150  ${
          category === "WorkFlow"
            ? theme === "light"
              ? "bg-transparent text-gray-900 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
              : "bg-transparent text-gray-100 border-b-3 border-gray-400 rounded-none lg:transform lg:translate-y-0.5"
            : "text-white shadow-sm bg-purple-500 hover:bg-purple-600 hover:cursor-pointer hover:scale-95 rounded-sm"
        }`}
        onClick={() => navigator("WorkFlow")}
      >
        WorkFlow💼 ({categoryCount.WorkFlow})
      </div>
    </div>
  );
};
export default Categories;
