import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

export const useAxiosInterceptors = () => {
  const { getAccessTokenSilently } = useAuth0();

  client.interceptors.request.use(
    async (config) => {
      const token = await getAccessTokenSilently();
      console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
