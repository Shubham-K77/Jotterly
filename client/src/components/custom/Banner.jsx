/* eslint-disable react/prop-types */
const Banner = ({ image, title, desc }) => {
  return (
    <div className="w-[98%] lg:w-[95%] mt-2 mb-2 flex flex-col justify-start items-center bg-transparent">
      <div
        className="w-full h-[30vh] lg:w-full lg:h-[60vh] mb-2 rounded-md shadow-sm"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {title && (
        <div className="mt-2 mb-2 text-[1.05rem] font-bold"> {title} </div>
      )}
      <div className="mt-2 mb-6 text-center text-[1.05rem] font-semibold">
        {desc}
      </div>
    </div>
  );
};

export default Banner;
