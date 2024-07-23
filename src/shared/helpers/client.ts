import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useGlobalStore } from "../../state/GlobalStore";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

export const useAxiosInterceptors = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { setToken } = useGlobalStore();

  client.interceptors.request.use(
    async (config) => {
      const token = await getAccessTokenSilently();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        setToken(token);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
