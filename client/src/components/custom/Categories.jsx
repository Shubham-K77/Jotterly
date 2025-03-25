const Categories = () => {
  return (
    <div className="w-[95%] mt-2 mb-2 flex flex-wrap justify-center lg:justify-start items-center">
      {/* Count Of All The Notes */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-teal-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1.05rem] mb-1.5 mr-2">
        All (1)
      </div>
      {/* Count Of IdeaBox */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-yellow-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2">
        IdeaBox💡 (1)
      </div>
      {/* Count Of LifeCraft */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-orange-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2">
        LifeCraft⛺ (1)
      </div>
      {/* Count Of StudyNest */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-blue-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2">
        StudyNest🧠 (1)
      </div>
      {/* Count of ZenDen */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-green-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2">
        ZenDen☮️ (1)
      </div>
      {/* Count of WorkFlow */}
      <div className="w-[38%] h-[6vh] lg:w-[9.5%] lg:h-[5.5vh] text-white bg-purple-500 shadow-sm rounded-sm flex justify-center items-center font-semibold text-[1rem] mb-1.5 mr-2">
        WorkFlow💼 (1)
      </div>
    </div>
  );
};
export default Categories;
