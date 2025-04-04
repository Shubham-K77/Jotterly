import Navbar from "../components/custom/Navbar";
import { useSelector } from "react-redux";
import {
  motion,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { useState } from "react";
// Icons
import { RiChatVoiceAiFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
const Home = () => {
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const scaleX = useSpring(scrollYProgress);
  const navigate = useNavigate();
  const background = useTransform(
    scrollYProgress,
    [0, 0.9],
    ["rgb(255, 0, 0)", "rgb(0, 128, 0)"]
  );
  const theme = useSelector((state) => state.themeToggler.theme);
  const [visibleModals, setVisibleModals] = useState({
    aiSuggestions: false,
    tagNotes: false,
    organize: false,
    searchTags: false,
  });
  const handleModal = (modal) => {
    setVisibleModals((prev) => ({
      ...prev,
      [modal]: !prev[modal],
    }));
  };
  const categories = {
    studyNest: {
      buttonTitle: "StudyNest 🧠",
      title: "StudyNest – Where Learning Lives",
      desc: "Your personal hub for all things learning! Whether you're jotting down lecture notes, summarizing textbooks, or collecting research for a big project, StudyNest keeps your academic life organized. No more scattered notes—just a structured space to help you focus and retain knowledge effectively.",
      color: "bg-blue-500",
      backgroundImg: "/Images/studyBanner.jpg",
    },
    zenDen: {
      buttonTitle: "ZenDen ☮️",
      title: "ZenDen – Notes for a Balanced Life",
      desc: "A peaceful space for a balanced mind and body. Keep track of your wellness journey, from daily affirmations and self-care reminders to meditation insights and fitness goals. ZenDen is where you nurture yourself, stay mindful, and build healthy habits—one note at a time.",
      color: "bg-green-500",
      backgroundImg: "/Images/wellnessBanner.jpg",
    },
    lifeCraft: {
      buttonTitle: "LifeCraft ⛺",
      title: "LifeCraft – Document Your Life Journey",
      desc: "Because life is an adventure worth documenting. From travel diaries and bucket lists to deep reflections and life lessons, LifeCraft is your personal space to capture experiences that shape who you are. Look back, learn, and grow as you craft your unique story.",
      color: "bg-orange-500",
      backgroundImg: "/Images/lifeBanner.jpg",
    },
    ideaBox: {
      buttonTitle: "IdeaBox 💡",
      title: "IdeaBox – Where Innovation Begins",
      desc: "Where your creative sparks turn into reality! Got a groundbreaking idea, a million-dollar startup thought, or just an interesting concept? Jot it down in IdeaBox before it disappears. This is your playground for innovation, brainstorming, and dreaming big.",
      color: "bg-yellow-500",
      backgroundImg: "/Images/ideaBanner.jpg",
    },
    workFlow: {
      buttonTitle: "WorkFlow 💼",
      title: "WorkFlow – Master Your Productivity",
      desc: "Stay on top of your professional game. Whether it's meeting notes, project planning, or career goals, WorkFlow keeps everything work-related in one neat and efficient space. Get more done, stay productive, and keep your professional life in perfect order.",
      color: "bg-purple-500",
      backgroundImg: "/Images/workBanner.jpg",
    },
  };
  const faqAnswers = {
    first: {
      question: "How does the AI suggestion feature work in Jotterly?",
      answer:
        "Jotterly’s AI suggestions are powered by Gorq API and ChatGPT. It generates three smart task ideas instantly—keeping things fast, helpful, and resource-friendly with a one-time API call.",
    },
    second: {
      question: "Is my data secure on Jotterly?",
      answer:
        "Absolutely. We prioritize your privacy. Sensitive data like your email and password are encrypted using the Blowfish cipher algorithm with multiple rounds of hashing. This makes your credentials virtually impossible to crack—even developers have no direct access to them.",
    },
    third: {
      question: "Which platforms is Jotterly available on?",
      answer:
        "Jotterly is currently available as a web-based application accessible through any modern browser. A mobile version with powerful features like reminders and smart notifications is already in the works—stay tuned for updates!",
    },
    forth: {
      question: "What technology stack powers Jotterly?",
      answer:
        "Jotterly is proudly built using the MERN Stack—MongoDB, Express.js, React, and Node.js. It began as a passion project by our developer, who poured their heart into every line of code to deliver a smooth, modern experience.",
    },
    fifth: {
      question: "Can I collaborate with others on Jotterly?",
      answer:
        "Currently, Jotterly is designed for solo productivity. However, we’re exploring real-time collaboration features that would allow you to co-edit tasks, share notes, and work together seamlessly. It’s on our roadmap!",
    },
  };
  const [currentCategory, setCurrentCategory] = useState("studyNest");
  const controls = useAnimationControls();
  const controlClick = () => {
    controls.start("appear");
  };
  const navigateToSection = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center transition-colors duration-150 ease-in-out overflow-x-hidden ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Navigation Bar */}
      <Navbar />
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX, background }}
        className="fixed top-0 w-full h-[0.75vh] origin-left"
      ></motion.div>
      {/* Hero Banner */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="w-full h-[115vh] lg:h-[80vh] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center mb-2"
      >
        <div className="w-[95%] lg:w-[35%] h-[80vh] flex flex-col justify-center items-center lg:items-start bg-transparent">
          <div className="w-[95%] font-bold text-[2.5rem] lg:text-[3.15rem] ml-4 mb-1">
            Take Notes Smarter with AI Assistance
          </div>
          <div className="w-[95%] font-semibold ml-4 text-[1.05rem] mb-6 lg:mb-4">
            Jotterly helps you capture ideas, organize tasks, and complete them
            faster with AI-powered suggestions.
          </div>
          <div
            className={`w-[45%] h-[8.5vh] lg:w-[65%] lg:h-[8.5vh] shadow-sm rounded-sm text-white font-semibold flex justify-center items-center text-[1.20rem] ml-4 mt-2 lg:mt-0 transition-all ease-in-out duration-150 hover:scale-105 hover:cursor-pointer ${
              theme === "light"
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-orange-700 hover:bg-orange-600"
            }`}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </div>
        </div>
        <div
          className="w-[98%] h-[32vh] lg:w-[72%] lg:h-[80vh] bg-transparent"
          style={{
            backgroundImage: `url('/Images/banner.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </motion.div>
      {/* Features Banner */}
      <motion.div
        layout
        initial={{ opacity: 0.75, scale: 0.5 }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          amount: "some",
          once: true,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        className="w-full bg-transparent flex flex-col justify-start items-center mb-2"
      >
        {/* Features Title */}
        <div className="text-[2.5rem] font-bold mt-6 mb-2 text-center">
          Jotterly: Notes Made Smarter, Work Made Easier
        </div>
        {/* Features Description */}
        <div className="text-[1.075rem] font-semibold mb-2 text-center">
          Jotterly makes note-taking effortless with AI suggestions, smart
          tagging, and easy search—helping you stay organized and productive.
        </div>
        {/* Features Showcase */}
        <motion.div
          layout
          className="w-[95%] lg:h-[65vh] bg-transparent flex flex-col justify-evenly items-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center mb-2"
        >
          {/* AI Suggestions */}
          <div className="w-[95%] lg:w-[20%] mt-2 mb-4 lg:mt-0 lg:mb-0 bg-transparent flex flex-col items-center">
            {/* Click Button */}
            <motion.div
              layout
              className={`w-[95%] h-[7.5vh] rounded-sm shadow-sm flex justify-around items-center mb-2 text-white hover:cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 ${
                theme === "light"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-orange-700 hover:bg-orange-600"
              }`}
              onClick={() => handleModal("aiSuggestions")}
            >
              <div className="text-[1.05rem] text-white font-semibold">
                AI-Powered Suggestions
              </div>
              <RiChatVoiceAiFill className="text-[2.05rem] text-white font-semibold" />
            </motion.div>
            {/* Popup Div */}
            <AnimatePresence mode="popLayout">
              {visibleModals.aiSuggestions && (
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, 150, -150, -150, 0],
                  }}
                  exit={{ rotate: 360, scale: 0 }}
                  transition={{
                    duration: 1.05,
                    ease: "backInOut",
                    times: [0, 0.25, 0.5, 0.85, 1],
                  }}
                  className={`w-[95%] h-[28vh] rounded-sm shadow-sm border-1 border-gray-300 flex flex-col justify-center items-center mb-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-800"
                  }`}
                >
                  <RiChatVoiceAiFill className="text-[2.25rem] font-semibold mb-1" />
                  <div className="text-[1.25rem] font-semibold mb-1">
                    AI Suggestions
                  </div>
                  <div className="w-[95%] text-[0.95rem] font-semibold text-justify">
                    Stuck on a task? Let AI help! Get intelligent suggestions to
                    refine, expand, or complete your notes effortlessly.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Tag Your Notes */}
          <div className="w-[95%] lg:w-[20%] mt-2 mb-4 lg:mt-0 lg:mb-0 bg-transparent flex flex-col items-center">
            {/* Click Button */}
            <motion.div
              layout
              className={`w-[95%] h-[7.5vh] rounded-sm shadow-sm flex justify-around items-center mb-2 hover:cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 ${
                theme === "light"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-orange-700 hover:bg-orange-600"
              }`}
              onClick={() => handleModal("tagNotes")}
            >
              <div className="text-[1.05rem] text-white font-semibold">
                Tag Your Notes
              </div>
              <FaTags className="text-[2.05rem] text-white font-semibold" />
            </motion.div>
            {/* Popup Div */}
            <AnimatePresence mode="popLayout">
              {visibleModals.tagNotes && (
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, 150, -150, -150, 0],
                  }}
                  exit={{ rotate: 360, scale: 0 }}
                  transition={{
                    duration: 1.05,
                    ease: "backInOut",
                    times: [0, 0.25, 0.5, 0.85, 1],
                  }}
                  className={`w-[95%] h-[28vh] rounded-sm shadow-sm border-1 border-gray-300 flex flex-col justify-center items-center mb-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-800"
                  }`}
                >
                  <FaTags className="text-[2.25rem] font-semibold mb-1" />
                  <div className="text-[1.25rem] font-semibold mb-1">
                    Tag Notes
                  </div>
                  <div className="w-[95%] text-[0.95rem] font-semibold text-justify">
                    Stay organized your way! Add custom tags to quickly find and
                    group related notes without the hassle.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Categorize And Organize */}
          <div className="w-[95%] lg:w-[20%] mt-2 mb-4 lg:mt-0 lg:mb-0 bg-transparent flex flex-col items-center">
            {/* Click Button */}
            <motion.div
              layout
              className={`w-[95%] h-[7.5vh] rounded-sm shadow-sm flex justify-around items-center mb-2 hover:cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 ${
                theme === "light" ? "bg-purple-500" : "bg-orange-700"
              }`}
              onClick={() => handleModal("organize")}
            >
              <div className="text-[1.05rem] text-white font-semibold">
                Categorize & Organize
              </div>
              <FaFolderOpen className="text-[2.05rem] text-white font-semibold" />
            </motion.div>
            {/* Popup Div */}
            <AnimatePresence mode="popLayout">
              {visibleModals.organize && (
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, 150, -150, -150, 0],
                  }}
                  exit={{ rotate: 360, scale: 0 }}
                  transition={{
                    duration: 1,
                    ease: "backInOut",
                    times: [0, 0.25, 0.5, 0.85, 1],
                  }}
                  className={`w-[95%] h-[28vh] rounded-sm shadow-sm border-1 border-gray-300 flex flex-col justify-center items-center mb-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-800"
                  }`}
                >
                  <FaFolderOpen className="text-[2.25rem] font-semibold mb-1" />
                  <div className="text-[1.25rem] font-semibold mb-1">
                    Categorize & Organize
                  </div>
                  <div className="w-[95%] text-[0.95rem] font-semibold text-justify">
                    No more messy notes! Sort and structure your ideas into
                    categories for a clutter-free workspace.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Search With Tags */}
          <div className="w-[95%] lg:w-[20%] mt-2 mb-6 lg:mt-0 lg:mb-0 bg-transparent flex flex-col items-center">
            {/* Click Button */}
            <motion.div
              layout
              className={`w-[95%] h-[7.5vh] rounded-sm shadow-sm flex justify-around items-center mb-2 hover:cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 ${
                theme === "light" ? "bg-purple-500" : "bg-orange-700"
              }`}
              onClick={() => handleModal("searchTags")}
            >
              <div className="text-[1.05rem] text-white font-semibold">
                Search with Tags
              </div>
              <FaSearch className="text-[2.05rem] text-white font-semibold" />
            </motion.div>
            {/* Popup Div */}
            <AnimatePresence mode="popLayout">
              {visibleModals.searchTags && (
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, 150, -150, -150, 0],
                  }}
                  exit={{ rotate: 360, scale: 0 }}
                  transition={{
                    duration: 1,
                    ease: "backInOut",
                    times: [0, 0.25, 0.5, 0.85, 1],
                  }}
                  className={`w-[95%] h-[28vh] rounded-sm shadow-sm border-1 border-gray-300 flex flex-col justify-center items-center mb-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-800"
                  }`}
                >
                  <FaSearch className="text-[2.25rem] font-semibold mb-1" />
                  <div className="text-[1.25rem] font-semibold mb-1">
                    Search with Tags
                  </div>
                  <div className="w-[95%] text-justify text-[0.95rem] font-semibold">
                    Find what you need in seconds! Use tags to instantly locate
                    specific notes without endless scrolling.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
      {/* Categories Banner */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0.85 }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          amount: "some",
          once: true,
        }}
        transition={{
          duration: 2,
          ease: "backInOut",
        }}
        className="w-full lg:h-[95vh] bg-transparent flex flex-col justify-start items-center"
      >
        {/* Banner Title */}
        <div className="w-[98%] mb-2 text-[2.5rem] font-bold mt-2 text-center">
          📂 Organize Your Notes, Your Way
        </div>
        {/* Banner Desc */}
        <div className="text-justify text-[1.10rem] font-semibold mb-2 w-[95%]">
          Keep your thoughts structured and accessible with smart categories
          designed for every aspect of your life. Whether it’s study material,
          wellness tips, travel insights, or work-related notes—everything has
          its place!
        </div>
        {/* Categories Showcase */}
        <div className="w-full lg:h-[75vh] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center">
          {/* Buttons Display */}
          <div
            className="w-full lg:w-[35%] h-[50vh] lg:h-[70vh] bg-transparent flex flex-col justify-evenly items-center"
            onClick={controlClick}
          >
            {Object.entries(categories).map(([id, element]) => (
              <div
                className={`w-[75%] lg:w-[55%] h-[7.5vh] rounded-sm shadow-sm mb-2 text-white font-semibold text-[1.25rem] flex justify-center items-center hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-105 ${element.color}`}
                id={id}
                key={id}
                onClick={() => setCurrentCategory(id)}
              >
                {element.buttonTitle}
              </div>
            ))}
          </div>
          {/* Modal Display */}
          <div className="w-full h-[65vh] lg:w-[65%] lg:h-[70vh] bg-transparent flex flex-col justify-center items-center">
            <motion.div
              initial={{
                opacity: 0.95,
                y: 0,
              }}
              variants={{
                appear: {
                  scale: [0.8, 0.85, 0.9, 0.95, 1],
                  opacity: [0.8, 0.85, 0.9, 0.95, 1],
                  y: [0, 50, -50, -50, 0],
                },
              }}
              animate={controls}
              transition={{
                ease: "easeInOut",
                duration: 1.75,
                times: [0, 0.25, 0.5, 0.85, 1],
              }}
              className={`w-[95%] lg:w-[55%] rounded-sm flex flex-col justify-start items-center bg-transparent`}
            >
              <div
                className="w-full h-[25vh] rounded-t-sm mb-2"
                style={{
                  backgroundImage: `url(${categories[currentCategory].backgroundImg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="text-[1.5rem] font-bold mb-2 w-[95%] text-center">
                {categories[currentCategory].title}
              </div>
              <div className="w-[95%] text-[0.95rem] text-justify font-semibold mb-6">
                {categories[currentCategory].desc}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* CTA ACTION BANNER */}
      <motion.div
        initial={{
          opacity: 0.75,
          scale: 0.75,
          y: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: -2,
        }}
        transition={{
          duration: 2,
          ease: "backInOut",
        }}
        className={`w-full h-[48vh] lg:h-[40vh] flex flex-col justify-center items-center ${
          theme === "light" ? "bg-purple-500" : "bg-orange-700"
        }`}
      >
        {/* CTA Title */}
        <div className="w-[95%] font-bold text-[2rem] mt-2 lg:text-[2.25rem] text-center text-white mb-1">
          Ready to transform your productivity?
        </div>
        {/* CTA Description */}
        <div className="w-[95%] text-justify font-semibold text-[1.05rem] lg:text-center mb-6 text-white">
          Whether it’s study notes, life lessons, or work tasks—keep everything
          in one seamless, structured, and accessible place. Start simplifying
          your workflow today!
        </div>
        {/* CTA Buttons */}
        <div className="w-full lg:w-[55%] flex justify-center items-center mt-2 mb-2">
          <div
            className={`w-[40%] lg:w-[35%] h-[8.5vh] rounded-sm shadow-sm hover:cursor-pointer bg-white transition-all ease-in-out duration-150 hover:scale-105 flex justify-center items-center font-semibold text-[1.25rem] mr-4 ${
              theme === "light" ? "text-purple-500" : "text-orange-700"
            }`}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </div>
          <div
            className={`w-[45%] lg:w-[35%] h-[8.5vh] rounded-sm shadow-sm hover:cursor-pointer bg-white transition-all ease-in-out duration-150 hover:scale-105 flex justify-center items-center font-semibold text-[1.25rem] mr-4 ${
              theme === "light" ? "text-purple-500" : "text-orange-700"
            }`}
            onClick={() => navigate("/login")}
          >
            Access Account
          </div>
        </div>
      </motion.div>
      {/* FAQ Section */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0.85 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: "some" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full bg-transparent flex flex-col justify-start items-center"
      >
        {/* FAQ TITLE */}
        <div className="w-[95%] text-center lg:w-full text-[2.5rem] font-bold mt-6 mb-2">
          Frequently Asked Questions
        </div>
        {/* FAQ Description */}
        <div className="w-[95%] text-justify lg:text-center lg:w-full text-[1.10rem] font-semibold mb-6">
          Find answers to common questions about Jotterly.
        </div>
        {/* FAQ Banner */}
        {Object.entries(faqAnswers).map(([id, element]) => (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{
              amount: "all",
              once: true,
            }}
            transition={{
              duration: 1,
              ease: "anticipate",
            }}
            className={`w-[95%] h-[40vh] lg:w-[65%] lg:h-[30vh] shadow-sm rounded-sm mt-2 mb-6 flex flex-col justify-start items-start pl-2 border-1 border-gray-300 ${
              theme === "light" ? "bg-gray-50" : "bg-gray-700"
            }`}
            key={id}
          >
            {/* FAQ Question */}
            <div className="w-[95%] text-start lg:w-full text-[1.25rem] font-bold mb-2 mt-6 ml-2 lg:ml-4">
              {element.question}
            </div>
            {/* FAQ Answer */}
            <div
              className={`w-[95%] text-[0.95rem] lg:text-[1.05rem] font-semibold mb-2 mt-6 lg:ml-4 text-justify transition-colors ease-in-out duration-150 ${
                theme === "light" ? "text-gray-500" : "text-gray-200"
              }`}
            >
              {element.answer}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* To The Top Button */}
      <div
        className={`fixed bottom-2 right-5 w-[15%] lg:w-[4%] h-[8.5vh] rounded-sm shadow-sm z-10 flex justify-center items-center hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-110 ${
          theme === "light"
            ? "bg-sky-700 hover:bg-sky-500"
            : "bg-rose-400 hover:bg-rose-500"
        }`}
        onClick={navigateToSection}
      >
        <FaArrowUp className="text-[2rem] font-semibold text-white" />
      </div>
      {/* SiteMap Section */}
      <div
        className={`w-full lg:h-[30vh] flex flex-col justify-start items-center border-t-1 border-gray-300 ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        {/* Logo And Socials */}
        <div className="w-full lg:h-[15vh] flex justify-around items-center bg-transparent mb-2">
          {/* Logo */}
          <div
            className="w-[45%] h-[10vh] lg:w-[12.5%] lg:h-[9.5vh]"
            style={{
              backgroundImage: `url(${
                theme === "light" ? "/Images/logo.png" : "/Images/darkLogo.png"
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Socials */}
          <div className="w-[50%] lg:w-[15%] flex justify-evenly items-center">
            <FaLinkedinIn
              className="font-semibold text-[1.75rem] hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-110"
              onClick={() =>
                (window.location.href =
                  "https://www.linkedin.com/in/shubhamkadariya/")
              }
            />
            <FaXTwitter className="font-semibold text-[1.75rem] hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-110" />
            <SiGmail
              className="font-semibold text-[1.75rem] hover:cursor-pointer transition-all ease-in-out duration-150 hover:scale-110"
              onClick={() =>
                (window.location.href = "mailto:shubhamkadariya@gmail.com")
              }
            />
          </div>
        </div>
        {/* Final Description */}
        <div className="w-[95%] text-justify lg:text-center font-semibold text-[1rem]">
          Jotterly helps you capture ideas, organize tasks, and complete them
          faster with AI-powered suggestions.
        </div>
        {/* Last Copyright and Developer Initials */}
        <div className="border-t-1 border-gray-300 w-full mt-6 flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-end">
          <div className="text-[0.95rem] font-semibold mt-2 mb-1">
            &copy; 2025 Jotterly. All rights reserved.
          </div>
          <div className="text-[0.95rem] font-semibold mt-2 mb-1">
            Made with ❤️ for passionate productivity enthusiasts.
          </div>
          <div className="text-[0.95rem] font-semibold mt-2 mb-1">
            Crafted with care by Shubham Kadariya.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
