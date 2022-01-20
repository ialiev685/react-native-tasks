import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 12345,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    authState: (state, action) => ({ ...state, action }),
  },
});
