import { createAsyncThunk } from "@reduxjs/toolkit";
//firebase
import { authKey, createUserWithEmailAndPassword } from "../../firebase/config";

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
      result._tokenResponse.login = login;
      return result._tokenResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
