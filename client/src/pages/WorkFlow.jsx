/* eslint-disable react/no-unescaped-entities */
import Banner from "@/components/custom/Banner";
import LoginNavbar from "@/components/custom/LoginNavbar";
import Categories from "@/components/custom/Categories";
import NotesDisplay from "@/components/custom/NotesDisplay";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import BackButton from "@/components/custom/BackButton";
const WorkFlow = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.userState.userData);
  const theme = useSelector((state) => state.themeToggler.theme);
  const [loading, setLoading] = useState(false);
  const [categoryCount, setCategoryCount] = useState({});
  const [notes, setNotes] = useState([]);
  const [aiLoading, setAILoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  //Function To Get All Notes:
  useEffect(() => {
    const getData = async () => {
      try {
        if (!user || !user._id) {
          console.log("User information missing!");
          return null;
        }
        const response = await axios.get(
          `http://localhost:5555/api/v1/notes/categoryNotes/WorkFlow/${user._id}`,
          { withCredentials: true }
        );
        setNotes(response?.data?.data);
      } catch (error) {
        enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      }
    };
    getData();
  }, [enqueueSnackbar, user]);
  //Function To Count Categories:
  useEffect(() => {
    const counter = async () => {
      try {
        if (!user || !user._id) {
          console.log("No User Data Availabel!");
          return null;
        }
        const userId = user._id;
        const response = await axios.get(
          `http://localhost:5555/api/v1/notes/count/${userId}`,
          { withCredentials: true }
        );
        setCategoryCount(response?.data?.categoryCount);
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    };
    counter();
  }, [enqueueSnackbar, user]);
  //Update The Category Counts:
  const refreshCategoryCount = async () => {
    try {
      if (!user || !user._id) {
        console.log("No user data available");
        return;
      }
      const response = await axios.get(
        `http://localhost:5555/api/v1/notes/count/${user._id}`,
        { withCredentials: true }
      );
      setCategoryCount(response?.data?.categoryCount);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
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
        `http://localhost:5555/api/v1/notes/categoryNotes/WorkFlow/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNotes?.data?.data);
      setLoading(false);
    } catch (error) {
      let message = error.response?.data.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };
  // Delete The Notes:
  const deleteNote = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:5555/api/v1/notes/delete",
        {
          data: { postId },
          withCredentials: true,
        }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      // Fetch updated notes after deleting
      const updatedNotes = await axios.get(
        `http://localhost:5555/api/v1/notes/categoryNotes/WorkFlow/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNotes?.data?.data);
      //Updated Categories Count:
      await refreshCategoryCount();
      // Clear the note ID when deletion is complete
      setNoteIdToDelete(null);
      return setLoading(false);
    } catch (error) {
      let message = error?.response?.data?.message || "Internal Server Error!";
      enqueueSnackbar(message, { variant: "error" });
      // Clear the note ID when deletion is complete
      setNoteIdToDelete(null);
      setLoading(false);
    }
  };
  //Edit The Notes:
  const editNote = async (noteId, title, content, tags, categories, userId) => {
    setLoading(true);
    try {
      if (!user || !user._id) {
        console.log("No User Information Found!");
        return null;
      }
      const response = await axios.put(
        "http://localhost:5555/api/v1/notes/editNote",
        {
          noteId,
          title,
          content,
          tags,
          categories,
          userId,
        },
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      // Fetch updated notes after deleting
      const updatedNotes = await axios.get(
        `http://localhost:5555/api/v1/notes/categoryNotes/WorkFlow/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNotes?.data?.data);
      //Updated Categories Count:
      await refreshCategoryCount();
      setLoading(false);
    } catch (error) {
      let message = error.response?.data?.message;
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };
  //AI Suggestions:
  const generateSuggestion = async (title, content, postId) => {
    setAILoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/notes/suggest",
        {
          task: title,
          desc: content,
          postId,
        },
        { withCredentials: true }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      if (!user || !user._id) {
        console.log("User Information Missing!");
        return null;
      }
      const updatedNote = await axios.get(
        `http://localhost:5555/api/v1/notes/categoryNotes/WorkFlow/${user._id}`,
        { withCredentials: true }
      );
      setNotes(updatedNote?.data?.data);
      setAILoading(false);
    } catch (error) {
      let message = error.response?.data?.message;
      enqueueSnackbar(message, { variant: "error" });
      setAILoading(false);
    }
  };
  //Function To Search For Specific Category:
  const searchTag = async (searchText) => {
    if (!searchText || searchText.trim().length === 0) {
      setIsSearching(false);
      setSearchedNotes([]);
      return;
    }
    setIsSearching(true);
    try {
      setSearchLoading(true);
      if (!user || !user._id) {
        setSearchLoading(false);
        return null;
      }
      const response = await axios.get(
        `http://localhost:5555/api/v1/notes/searchTags/${user._id}/${searchText}/WorkFlow`,
        { withCredentials: true }
      );
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      setSearchedNotes(response?.data?.notesInfo);
      setSearchLoading(false);
    } catch (error) {
      let message = error.response?.data?.message;
      enqueueSnackbar(message, { variant: "error" });
      setSearchLoading(false);
    }
  };
  return (
    <div
      className={`w-full min-h-screen flex flex-col jusitfy-start items-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* NavBar   */}
      <LoginNavbar searchTag={searchTag} searchLoading={searchLoading} />
      {/* Important Message */}
      <div className="text-[1rem] font-semibold mb-4 text-justify w-[90%] lg:text-center">
        Find notes by tags! When inside a category, search within it. On the
        main page, search across all notes.
      </div>
      {/* Categories */}
      <Categories categoryCount={categoryCount} category={"WorkFlow"} />
      {/* Banner Image */}
      <Banner
        image={`/Images/workBanner.jpg`}
        desc={
          "WorkFlow – Power up your productivity with a dynamic space for workplace tasks, projects, and career goals, keeping you organized and ahead of the game!"
        }
      />
      {/* Search Display If Searching Show The Searched Note But If Not Then Display The Notes In The DB!*/}
      {isSearching === true ? (
        searchLoading === true ? (
          <div className="flex flex-col justify-start items-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center w-full mt-6 animate-pulse">
            {/* Displaying The Skeleton */}
            <div className="flex flex-col justify-start items-start transition-transform ease-in-out duration-150 hover:scale-105 hover:cursor-pointer shadow-sm w-[95%] h-[46.5vh] lg:w-[30%] lg:h-[36vh] rounded-md mb-8 border-1 border-gray-300">
              {/* Title And Button */}
              <div className="w-full flex justify-around items-center mb-2 mt-2">
                <div className="w-[65%] h-[1.5vh] rounded-md bg-gray-400 animate-pulse mt-4"></div>
                <div
                  className={`w-[25%] h-[6vh] rounded-sm shadow-sm animate-pulse mt-4 ${
                    theme === "light" ? "bg-sky-700" : "bg-rose-400"
                  }`}
                ></div>
              </div>
              {/* Date Display */}
              <div className="w-[55%] h-[1.5vh] rounded-md bg-gray-400 animate-pulse mt-4 ml-4 mb-2"></div>
              {/* Category Display */}
              <div
                className={`w-[25%] h-[6vh] rounded-sm shadow-sm animate-pulse ml-4 mt-4 mb-2 ${
                  theme === "light" ? "bg-sky-700" : "bg-rose-400"
                }`}
              ></div>
              {/* Tags Display */}
              <div className="w-[95%] h-[1.5vh] rounded-md bg-gray-400 animate-pulse mt-4 ml-2 mb-4"></div>
              {/* Information Display */}
              <div className="w-[95%] h-[1.5vh] rounded-md bg-gray-400 animate-pulse mt-4 ml-2 mb-4"></div>
            </div>
          </div>
        ) : searchedNotes && searchedNotes.length > 0 ? (
          <div className="flex flex-col justify-start items-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center w-full mt-6">
            {searchedNotes.map((note) => (
              <NotesDisplay
                key={note._id}
                data={note}
                pinNote={pinNote}
                loading={loading}
                aiLoading={aiLoading}
                deleteNote={deleteNote}
                generateSuggestion={generateSuggestion}
                editNote={editNote}
                isDeleteDialogOpen={noteIdToDelete === note._id}
                openDeleteDialog={(id) => setNoteIdToDelete(id)}
                closeDeleteDialog={() => setNoteIdToDelete(null)}
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
              It looks like that note doesn't exist in your collection. Want to
              try another search?
            </div>
          </div>
        )
      ) : notes && notes.length > 0 ? (
        <div className="flex flex-col justify-start items-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center w-full mt-6">
          {notes.map((note) => (
            <NotesDisplay
              key={note._id}
              data={note}
              pinNote={pinNote}
              loading={loading}
              deleteNote={deleteNote}
              aiLoading={aiLoading}
              generateSuggestion={generateSuggestion}
              editNote={editNote}
              isDeleteDialogOpen={noteIdToDelete === note._id}
              openDeleteDialog={(id) => setNoteIdToDelete(id)}
              closeDeleteDialog={() => setNoteIdToDelete(null)}
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
            No notes found in this category. Please go back to the main page and
            create a new note under this category!
          </div>
        </div>
      )}
      {/* Back Button */}
      <BackButton />
    </div>
  );
};

export default WorkFlow;
