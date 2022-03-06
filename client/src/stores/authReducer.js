import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  phone: "",
  email: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
    },
  },
});

export const { setUser } = authReducer.actions;

export default authReducer.reducer;
