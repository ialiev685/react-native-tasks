import { createAsyncThunk } from "@reduxjs/toolkit";
//firebase
import {
  authKey,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../../firebase/config";

export const fetchRegisterUser = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const { email, password, login } = data;
      const result = await createUserWithEmailAndPassword(
        authKey,
        email,
        password
      );
      await updateProfile(authKey.currentUser, { displayName: login });

      result._tokenResponse.login = login;

      return result._tokenResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const { email, password } = data;
      const result = await signInWithEmailAndPassword(authKey, email, password);

      return result._tokenResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchIsLoginedUser = createAsyncThunk(
  "user/isLogined",
  async (_, thunkApi) => {
    try {
      const user = await authKey.currentUser;

      if (user !== null) {
        const profile = {
          login: user.displayName,
          userId: user.uid,
          token: user.accessToken,
          logined: true,
        };
        console.log("зашел!!!", profile);
        return profile;
      }
    } catch (error) {
      console.log("error:", error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
