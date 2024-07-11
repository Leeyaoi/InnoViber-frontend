import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

interface Props {
  children: React.ReactNode;
}

export const AxiosInterceptor = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const resInterceptor = async (
      config: InternalAxiosRequestConfig<unknown>
    ) => {
      const token = await getAccessTokenSilently();
      config.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
      return config;
    };

    const errInterceptor = (error: unknown) => {
      return Promise.reject(error);
    };

    const interceptor = client.interceptors.request.use(
      resInterceptor,
      errInterceptor
    );

    return () => client.interceptors.request.eject(interceptor);
  }, [getAccessTokenSilently]);
  return children;
};
