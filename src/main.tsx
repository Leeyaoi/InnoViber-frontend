import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { AxiosInterceptor } from "./shared/helpers/client";
import { theme } from "./shared/assets/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH_AUDIENCE,
          scope: "openid profile email",
        }}
      >
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);
