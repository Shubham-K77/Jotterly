import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice/theme";
import userReducer from "./userSlice/User";
const store = configureStore({
  reducer: {
    themeToggler: themeReducer,
    userState: userReducer,
  },
});

export default store;
