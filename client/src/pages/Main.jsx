import LoginNavbar from "@/components/custom/LoginNavbar";
import { useSelector } from "react-redux";
import NotesDisplay from "@/components/custom/NotesDisplay";
import CreateNote from "@/components/custom/CreateNote";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Banner from "@/components/custom/Banner";
const Main = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useSelector((state) => state.themeToggler.theme);
  const user = useSelector((state) => state.userState.userData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  //Create New Note:
  const create = async (title, content, category, tags) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/notes/create",
        { title, content, category, tags, userId: user._id },
        { withCredentials: true }
      );
      enqueueSnackbar(response?.data?.message || "Successfully Created!", {
        variant: "success",
      });
      setOpen(false);
      // Fetch updated notes after pinning
      const updatedNotes = await axios.get(
        `http://localhost:5555/api/v1/notes/getNotes/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNotes?.data?.fetchData);
      return setLoading(false);
    } catch (error) {
      let message = error.response?.data?.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setOpen(false);
      return setLoading(false);
    }
  };
  // Fetch Notes On Render:
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5555/api/v1/notes/getNotes/${user._id}`,
          { withCredentials: true }
        );
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        setNotes(response?.data?.fetchData);
      } catch (error) {
        let message = error.response?.data?.message || "Internal Server Error!";
        enqueueSnackbar(message, { variant: "error" });
      }
    };
    fetchData();
  }, [enqueueSnackbar, user]);
  // Pin The Notes:
  const pinNote = async (userId, noteId) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:5555/api/v1/notes/pinNote",
        { userId, noteId },
        { withCredentials: true }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      // Fetch updated notes after pinning
      const updatedNotes = await axios.get(
        `http://localhost:5555/api/v1/notes/getNotes/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNotes?.data?.fetchData);
      setLoading(false);
    } catch (error) {
      let message = error.response?.data.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
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
      {/* Navigation Bar */}
      <LoginNavbar />
      {/* Banner Display */}
      <Banner
        image={"/Images/mainBanner.png"}
        desc={
          "Capture, organize, and elevate your thoughts—your personal space for ideas, tasks, learning, well-being, and productivity."
        }
      />
      {/* Display Notes */}
      {notes && notes.length > 0 ? (
        <div className="flex flex-col justify-start items-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center w-full mt-6">
          {notes.map((note) => (
            <NotesDisplay
              key={note._id}
              data={note}
              pinNote={pinNote}
              loading={loading}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[95vh] lg:h-[85vh] bg-transparent flex flex-col justify-center items-center">
          <div
            className="w-[85%] h-[65vh] lg:w-[20%] lg:h-[55vh] mb-2"
            style={{
              backgroundImage: `url(/Images/clipboard.png)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="w-[85%] lg:w-full flex justify-center items-center text-[1.05rem] font-semibold mb-2 text-center">
            Create your first note by clicking the + button to get started!
          </div>
        </div>
      )}
      {/* Create Button */}
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
