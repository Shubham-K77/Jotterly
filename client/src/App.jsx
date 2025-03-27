import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Reset from "./pages/Reset";
import Main from "./pages/Main";
import StudyNest from "./pages/StudyNest";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/main" element={<Main />} />
      <Route path="/study" element={<StudyNest />} />
      <Route path="/reset/:id" element={<Reset />} />
    </Routes>
  );
};

export default App;
