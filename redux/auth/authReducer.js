import { createSlice } from "@reduxjs/toolkit";
//asyncThunk
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchIsLoginedUser,
} from "./authOperation";

const initialState = {
  login: null,
  userId: null,
  token: null,
  logined: false,
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
      state.token = payload.idToken;
      state.userId = payload.localId;
      state.login = payload.login;
      // state.logined = true;
    },

    [fetchRegisterUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [fetchLoginUser.fulfilled]: (state, { payload }) => {
      state.token = payload.idToken;
      state.userId = payload.localId;
      state.login = payload.displayName;
      // state.logined = true;
    },
    [fetchLoginUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [fetchIsLoginedUser.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload };
    },

    [fetchIsLoginedUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});
