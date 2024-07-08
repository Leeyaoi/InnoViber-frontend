import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: {
      fontSize: 20,
    },
    h2: {
      fontSize: 18,
    },
    h6: {
      fontSize: 12,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
