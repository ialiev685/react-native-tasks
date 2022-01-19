import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
//reactotron-redux
// import Reactotron from "../ReactotronConfig";
// const reactotron = Reactotron.createEnhancer();

const rootReucer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReucer,
  // reactotron,
});
