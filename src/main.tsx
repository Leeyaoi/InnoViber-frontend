import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import MainPage from "./pages/MainPage/MainPage";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#14511e",
      dark: "#084107",
      light: "#f2e4d1",
      contrastText: "#f2e4d1",
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: 18,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  </React.StrictMode>
);
