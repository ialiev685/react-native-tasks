import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    authState: (state, action) => ({ ...state, action }),
  },
});
