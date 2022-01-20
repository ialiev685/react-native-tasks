import React, { useState } from "react";
//Reactotron
// import Reactotron from "reactotron-react-native";
// import("./ReactotronConfig");
// Reactotron.log("hello world");

import { Main } from "./components/Main";

//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
