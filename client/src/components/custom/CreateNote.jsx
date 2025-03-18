/* eslint-disable react/prop-types */
import { IoAdd } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import { useSnackbar } from "notistack";
//Dialog Component Of Shad-CN
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const CreateNote = ({ theme, create, loading, open, setOpen }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [singleTag, setSingleTag] = useState("");
  //Add Tags
  const addTags = () => {
    if (!singleTag || singleTag.length < 3 || singleTag.length > 8) {
      return enqueueSnackbar(
        "Tags must be between 3 and 12 characters. Please try again.",
        {
          variant: "error",
        }
      );
    }
    setTags([...tags, "#" + singleTag]);
    setSingleTag("");
  };
  //Remove Tags:
  const removeTags = (value) => {
    setTags([...tags.filter((data) => data != value)]);
  };
  //Check Data Before Create:
  const checkData = () => {
    if (!title || !content) {
      setTitle("");
      setContent("");
      setTags([]);
      return enqueueSnackbar(
        "Please provide both a title and content to proceed.",
        { variant: "error" }
      );
    }
    if (title.length < 3 || title.length > 50) {
      setTitle("");
      return enqueueSnackbar(
        "Title must be between 3 and 50 characters. Please try again.",
        { variant: "error" }
      );
    }
    if (content.length < 10 || title.length > 500) {
      setTitle("");
      return enqueueSnackbar(
        "Content must be between 10 and 500 characters. Please try again.",
        { variant: "error" }
      );
    }
    if (tags && tags.length > 3) {
      return enqueueSnackbar("Please limit your selection to 3 tags only.", {
        variant: "error",
      });
    }
    create(title, content, tags);
    //Reset After Function Call:
    setTitle("");
    setContent("");
    setTags([]);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`absolute bottom-3 lg:bottom-5 lg:right-[3.5rem] right-4 mt-2 w-[14%] lg:w-[3.5%] h-[7vh] rounded-sm flex justify-center items-center ${
            theme === "light"
              ? "bg-sky-700 hover:bg-sky-600"
              : "bg-rose-400 hover:bg-rose-300"
          } transition-transform ease-in-out duration-150 hover:scale-110 hover:cursor-pointer`}
        >
          <IoAdd className="text-white text-[2.15rem] font-semibold" />
        </div>
      </DialogTrigger>
      <DialogContent
        className={`${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-left ml-2 text-[0.95rem] text-gray-400">
            TITLE
          </DialogTitle>
          <div className="mt-1 mb-2 ml-2 w-full flex justify-start items-center">
            <input
              type="text"
              className="pl-2 h-[6.25vh] w-[85%] rounded-sm text-[1.10rem] font-semibold border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              placeholder="Go To Gym At 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </DialogHeader>
        {/* Custom Fields And Buttons! */}
        <div className="mt-2 text-left ml-2 text-[0.90rem] text-gray-400 font-semibold">
          CONTENT
        </div>
        {/* Description Field */}
        <textarea
          className="border-1 border-gray-300 p-3 text-[0.90rem] font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-justify"
          rows={7}
          cols={10}
          placeholder="Head to the gym at 5 PM for a solid workout session. Focus on building strength, improving endurance, and staying consistent with your fitness routine. Remember to stay hydrated, warm up properly, and cool down afterward for optimal recovery. Keep pushing your limits! 💪🦵"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        {/* Description Count */}
        <div className="w-full text-end mr-2 text-gray-400 font-semibold text-[0.85rem]">
          {content.length}/500
        </div>
        {/* Tag Title */}
        <div className="mt-2 text-left ml-2 text-[0.90rem] text-gray-400 font-semibold">
          TAGS
        </div>
        {/* Fetch Tags */}
        {tags && (
          <div className="w-full flex flex-wrap justify-start items-center">
            {tags.map((item) => (
              <div
                className={`w-[32%] h-[5.5vh] mb-2 lg:w-[24%] lg:h-[4.5vh] flex justify-around items-center rounded-sm shadow-sm mr-2 transition-all ease-in-out duration-150 hover:scale-105 ${
                  theme === "light"
                    ? "bg-sky-700 hover:bg-sky-600"
                    : "bg-rose-400 hover:bg-rose-300"
                }`}
                key={item}
              >
                <div className="text-[0.95rem] font-semibold text-white">
                  {item}
                </div>
                <MdCancel
                  className="text-[1.05rem] font-semibold text-white transition-all ease-in-out duration-150 hover:scale-125 hover:cursor-pointer"
                  onClick={() => removeTags(`${item}`)}
                />
              </div>
            ))}
          </div>
        )}
        {/* Tag Field And Button */}
        <div className="w-full flex justify-start items-center">
          <input
            className="w-[50%] h-[6.5vh] lg:w-[35%] lg:h-[5.5vh] rounded-sm border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 ml-1 mr-2 pl-2 text-[1rem] font-semibold"
            placeholder="Add Tags"
            value={singleTag}
            onChange={(e) => setSingleTag(e.target.value)}
          />
          <div
            className={`w-[14%] h-[6.5vh] lg:w-[8%] lg:h-[5.5vh] rounded-sm shadow-sm flex justify-center items-center ${
              theme === "light"
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-rose-400 hover:bg-rose-300"
            } text-white transition-transform ease-in-out duration-150 hover:cursor-pointer hover:scale-110`}
            onClick={() => addTags()}
          >
            <IoAdd className="text-[1.85rem] font-semibold" />
          </div>
        </div>
        {/* Footer i.e. Create Button */}
        <DialogFooter>
          <div className="w-full flex justify-end items-center mt-2">
            <div
              className={`w-[35%] h-[7.5vh] lg:w-[25%] lg:h-[6.5vh] rounded-sm flex justify-center items-center text-[1.10rem] font-semibold text-white ${
                theme === "light"
                  ? "bg-sky-700 hover:bg-sky-600"
                  : "bg-rose-400 hover:bg-rose-300"
              } transition-all ease-in-out duration-150 hover:cursor-pointer hover:scale-105`}
              onClick={() => checkData()}
            >
              {loading === true ? (
                <ImSpinner8 className="animate-spin" />
              ) : (
                "Create"
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNote;
