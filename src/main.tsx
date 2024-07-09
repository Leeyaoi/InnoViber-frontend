import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";
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
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Auth0Provider>
);
