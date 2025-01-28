import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: null,
  isAuthenticated: false,
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
       
      state.userdata = action.payload;
      state.isAuthenticated = true;
      console.log('data addedd',state.userdata)
    },
    logout: (state) => {
      state.userdata = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
