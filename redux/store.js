import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { createStore } from "redux";
//reactotron-redux
import Reactotron from "../ReactotronConfig";

const rootReucer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

// export const store = Reactotron.createStore(rootReucer);

export const store = configureStore({
  reducer: rootReucer,
});
