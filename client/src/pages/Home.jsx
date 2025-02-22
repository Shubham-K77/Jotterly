import Navbar from "../components/custom/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Navbar />
    </div>
  );
};

export default Home;
