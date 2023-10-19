import { createSlice } from "@reduxjs/toolkit";

const adminLoginAuthSlice = createSlice({
  name: "admin-auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = adminLoginAuthSlice.actions;
export default adminLoginAuthSlice.reducer;