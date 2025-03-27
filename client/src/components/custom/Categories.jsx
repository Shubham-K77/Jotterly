/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const Categories = ({ categoryCount }) => {
  const navigate = useNavigate();
  const navigator = (category) => {
    if (category === "All") {
      return navigate("/main");
    } else if (category === "Study") {
      return navigate("/study");
    }
  };
  return (
    <div className="w-[95%] mt-2 mb-2 flex flex-wrap justify-center lg:justify-start items-center">
      {/* Count Of All The Notes */}
      <div
        className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-teal-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1.05rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-teal-600"
        onClick={() => navigator("All")}
      >
        All ({categoryCount.all})
      </div>
      {/* Count Of IdeaBox */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-yellow-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-yellow-600">
        IdeaBox💡 ({categoryCount.IdeaBox})
      </div>
      {/* Count Of LifeCraft */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-orange-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-orange-600">
        LifeCraft⛺ ({categoryCount.LifeCraft})
      </div>
      {/* Count Of StudyNest */}
      <div
        className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-blue-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-blue-600"
        onClick={() => navigator("Study")}
      >
        StudyNest🧠 ({categoryCount.StudyNest})
      </div>
      {/* Count of ZenDen */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-green-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-green-600">
        ZenDen☮️ ({categoryCount.ZenDen})
      </div>
      {/* Count of WorkFlow */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-purple-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2 transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-95 hover:bg-purple-600">
        WorkFlow💼 ({categoryCount.WorkFlow})
      </div>
    </div>
  );
};
export default Categories;
