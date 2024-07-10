import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const GetToken = async () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    const token = await getAccessTokenSilently();
    console.log(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});
