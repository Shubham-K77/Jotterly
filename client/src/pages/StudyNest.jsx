/* eslint-disable no-unused-vars */
import Banner from "@/components/custom/Banner";
import LoginNavbar from "@/components/custom/LoginNavbar";
import Categories from "@/components/custom/Categories";
import NotesDisplay from "@/components/custom/NotesDisplay";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import BackButton from "@/components/custom/BackButton";
const StudyNest = () => {
  const user = useSelector((state) => state.userState.userData);
  const theme = useSelector((state) => state.themeToggler.theme);
  const [categoryCount, setCategoryCount] = useState({});
  const [notes, setNotes] = useState([]);
  //Function To Get All Notes:
  useEffect(() => {
    const getData = async () => {
      try {
        if (!user || !user._id) {
          console.log("User information missing!");
          return null;
        }
        const response = await axios.get(
          `http://localhost:5555/api/v1/notes/categoryNotes/StudyNest/${user._id}`,
          { withCredentials: true }
        );
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        setNotes(response?.data?.data);
      } catch (error) {
        enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      }
    };
    getData();
  }, [user]);
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
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        setCategoryCount(response?.data?.categoryCount);
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    };
    counter();
  }, [user]);
  return (
    <div
      className={`w-full min-h-screen flex flex-col jusitfy-start items-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* NavBar   */}
      <LoginNavbar />
      {/* Categories */}
      <Categories categoryCount={categoryCount} />
      {/* Banner Image */}
      <Banner
        image={`/Images/studyBanner.jpg`}
        desc={
          "StudyNest – Your cozy digital space for organizing study materials, notes, and research, making learning effortless and structured."
        }
      />
      {/* Display Notes */}
      {notes && notes.length > 0 ? (
        <></>
      ) : (
        <div className="w-[95%] h-[65vh] flex flex-col justify-start items-center bg-transparent mb-4 mt-2">
          <div
            className="w-[70%] h-[45vh] lg:w-[20%] lg:h-[50vh] mb-2 mt-4 bg-transparent"
            style={{
              backgroundImage: `url('/Images/clipboard.png')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="w-full flex justify-center items-center text-[1.10rem] font-semibold text-center mb-2">
            Oops! No notes here yet! Head back to the main page to create a new
            one and start organizing your ideas. 🥴
          </div>
        </div>
      )}
      {/* Back Button */}
      <BackButton />
    </div>
  );
};
export default StudyNest;
