import React, { useEffect, useState } from "react";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import Routes from "./Routes";
import { extendTheme, NativeBaseProvider } from "native-base";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
    500: "#050A58",
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
}
