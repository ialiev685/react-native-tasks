import { createSlice } from "@reduxjs/toolkit";
//asyncThunk
import { fetchRegisterUser } from "./authOperation";

const initialState = {
  email: null,
  login: null,
  userId: null,
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducer: {
  //   authState: (state, action) => ({ ...state, action }),
  // },
  extraReducers: {
    [fetchRegisterUser.fulfilled]: (state, { payload }) => {
      console.log("action", payload);
      state.email = payload.email;
      state.token = payload.idToken;
      state.userId = payload.localId;
      state.login = payload.login;
    },

    [fetchRegisterUser.rejected]: (state, action) => {
      console.log("error", action.payload);
      // state.error = action
    },
  },
});
