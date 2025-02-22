import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice/theme";
const store = configureStore({
  reducer: {
    themeToggler: themeReducer,
  },
});

export default store;
