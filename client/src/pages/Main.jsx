import LoginNavbar from "@/components/custom/LoginNavbar";
import { useSelector } from "react-redux";
import NotesDisplay from "@/components/custom/NotesDisplay";
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
      <div className="w-full flex flex-wrap flex-col justify-start items-center lg:flex-row lg:justify-evenly lg:items-start p-2 mt-6 mb-4">
        <NotesDisplay />
      </div>
    </div>
  );
};
export default Main;
