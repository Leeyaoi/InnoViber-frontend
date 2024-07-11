import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const BuildClient = async () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const token = isAuthenticated ? await getAccessTokenSilently() : "";
  client = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export let client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    Authorization: "",
  },
});
