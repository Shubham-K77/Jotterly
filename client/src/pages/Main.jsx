import LoginNavbar from "@/components/custom/LoginNavbar";
import { useSelector } from "react-redux";
const Main = () => {
  const theme = useSelector((state) => state.themeToggler.theme);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-self-start items-center  ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <LoginNavbar />
    </div>
  );
};
export default Main;
