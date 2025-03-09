import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: "",
  userLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.userData = action.payload;
      !action.payload
        ? (state.userLoggedIn = false)
        : (state.userLoggedIn = true);
    },
  },
});

export default userSlice.reducer;
export const { loggedInUser } = userSlice.actions;
