import React, { useState, useEffect } from "react";
//навигация
import { NavigationContainer } from "@react-navigation/native";

//шрифты
import { useFonts } from "expo-font";

//router
import { Router } from "../../screens/Router";

//redux
import { fetchIsLoginedUser, getStateLogined } from "../../redux/auth";
import { useSelector, useDispatch } from "react-redux";

//firebase
// import { authKey, onAuthStateChanged } from "../../firebase/config";

export const Main = () => {
  const state = useSelector((state) => state);
  console.log("state redux:", state);
  const dispatch = useDispatch();

  const { logined } = useSelector(getStateLogined);

  useEffect(() => {
    dispatch(fetchIsLoginedUser());
  }, [logined]);

  // const [isAuth, setIsAuth] = useState(false);

  const [loaded] = useFonts({
    "Inter-Medium": require("../../fonts/Inter/Inter-Medium.ttf"),
    "Roboto-Regular": require("../../fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../fonts/Roboto/Roboto-Bold.ttf"),
  });

  const route = Router(logined);

  if (!loaded) {
    return null;
  }
  return <NavigationContainer>{route}</NavigationContainer>;
};
