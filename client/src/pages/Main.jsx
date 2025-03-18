import LoginNavbar from "@/components/custom/LoginNavbar";
import { useSelector } from "react-redux";
import NotesDisplay from "@/components/custom/NotesDisplay";
import CreateNote from "@/components/custom/CreateNote";
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
const Main = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useSelector((state) => state.themeToggler.theme);
  const user = useSelector((state) => state.userState.userData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //Create New Note:
  const create = async (title, content, tags) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/notes/create",
        { title, content, tags, userId: user._id },
        { withCredentials: true }
      );
      enqueueSnackbar(response?.data?.message || "Successfully Created!", {
        variant: "success",
      });
      setOpen(false);
      return setLoading(false);
    } catch (error) {
      let message = error.response?.data?.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setOpen(false);
      return setLoading(false);
    }
  };
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
      <CreateNote
        theme={theme}
        create={create}
        loading={loading}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
export default Main;
